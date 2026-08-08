"""TMDB(The Movie Database) 조회.

브라우저에서 TMDB 를 직접 부르면 API 키가 페이지 소스에 그대로 노출된다.
그래서 서버가 대신 부르고, 프론트에는 필요한 필드만 정리해서 넘긴다.
키는 .env 에만 두고 응답에는 절대 싣지 않는다.

키 설정 (.env)
    TMDB_API_KEY=...        v3 키 (32자 hex). https://www.themoviedb.org/settings/api
    TMDB_ACCESS_TOKEN=...   v4 읽기 전용 토큰. 둘 중 하나만 있으면 된다.

키가 없으면 TmdbNotConfigured 를 낸다. 앱을 죽이지는 않는다 — 프로필 화면은
TMDB 없이도 그대로 동작해야 하기 때문이다.
"""

import json
import urllib.error
import urllib.parse
import urllib.request

API_ROOT = "https://api.themoviedb.org/3"

#: 포스터(세로) / 배경(가로) 이미지 CDN. w500·w1280 은 TMDB 가 미리 만들어 둔 크기다.
IMG_POSTER = "https://image.tmdb.org/t/p/w500"
IMG_BACKDROP = "https://image.tmdb.org/t/p/w1280"

#: 응답이 없을 때 페이지 로딩을 붙잡고 있지 않도록.
TIMEOUT = 8

#: 같은 목록을 매 요청마다 새로 받아올 이유가 없다. TMDB 쪽 rate limit 도 아낀다.
CACHE_TTL_SECONDS = 600

#: {캐시키: (받아온 시각, 결과)}. 프로세스마다 따로 둔다.
_cache = {}


class TmdbNotConfigured(Exception):
    """TMDB_API_KEY / TMDB_ACCESS_TOKEN 이 .env 에 없다."""


class TmdbError(Exception):
    """TMDB 호출이 실패했다(네트워크, 잘못된 키, 5xx 등)."""


def is_configured(config):
    return bool(config.get("TMDB_API_KEY") or config.get("TMDB_ACCESS_TOKEN"))


def _request(config, path, params, now):
    """TMDB GET 한 번. 결과는 CACHE_TTL_SECONDS 동안 재사용한다.

    now 는 호출한 쪽에서 넘긴다(time.monotonic 기준 초). 테스트에서 시간을
    직접 조종할 수 있게 하기 위해서다.
    """
    if not is_configured(config):
        raise TmdbNotConfigured

    params = dict(params)
    headers = {"Accept": "application/json"}

    # v4 토큰이 있으면 헤더 인증을 쓴다. 없으면 v3 키를 쿼리로 붙인다.
    token = config.get("TMDB_ACCESS_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    else:
        params["api_key"] = config["TMDB_API_KEY"]

    url = f"{API_ROOT}{path}?{urllib.parse.urlencode(params)}"

    # 캐시 키에서 api_key 를 빼둔다. 키가 캐시에 남지 않게.
    cache_key = (path, tuple(sorted((k, v) for k, v in params.items() if k != "api_key")))
    hit = _cache.get(cache_key)
    if hit and now - hit[0] < CACHE_TTL_SECONDS:
        return hit[1]

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            payload = json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        # 401 은 키가 틀린 것이다. 본문에 키가 섞여 나올 수 있으니 그대로 올리지 않는다.
        raise TmdbError(f"TMDB 응답 {exc.code}") from None
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        raise TmdbError(f"TMDB 호출 실패: {type(exc).__name__}") from None

    _cache[cache_key] = (now, payload)
    return payload


def _to_card(item):
    """TMDB 항목 → 프로필 카드 한 장.

    profile.js 의 카드 렌더러가 기대하는 필드 이름에 맞춘다
    (title / desc / tags / period / role / img / displayTags).
    """
    # 영화는 title+release_date, TV 는 name+first_air_date 를 쓴다.
    title = item.get("title") or item.get("name") or "제목 없음"
    date = item.get("release_date") or item.get("first_air_date") or ""
    poster = item.get("poster_path")
    score = item.get("vote_average") or 0

    kind = "TV" if item.get("media_type") == "tv" or item.get("name") else "영화"

    return {
        "title": title,
        "desc": item.get("overview") or "줄거리가 등록되지 않았습니다.",
        "tags": f"TMDB, {kind}",
        "period": date[:4] or "—",
        "role": f"평점 {score:.1f}" if score else "평점 없음",
        "img": f"{IMG_POSTER}{poster}" if poster else "/static/img/netflix-logo.png",
        "displayTags": [kind, f"★ {score:.1f}"] if score else [kind],
    }


def _pick_trailer(videos):
    """영상 목록에서 예고편 하나를 고른다.

    우선순위: 공식 예고편 > 예고편 > 티저. 유튜브에 올라온 것만 쓴다
    (다른 사이트는 우리 플레이어가 embed 하지 못한다).
    """
    youtube = [v for v in videos if v.get("site") == "YouTube" and v.get("key")]

    def rank(v):
        kind = v.get("type")
        if kind == "Trailer":
            return 0 if v.get("official") else 1
        if kind == "Teaser":
            return 2 if v.get("official") else 3
        return 4

    best = sorted(youtube, key=rank)
    return best[0] if best and rank(best[0]) < 4 else None


def _trailer_url(config, movie_id, now, language="ko-KR"):
    """영화 예고편의 embed URL. 없으면 None.

    한국어로 먼저 찾고, 없으면 원어(보통 영어) 예고편으로 떨어진다.
    한국 개봉이 없는 작품은 ko-KR 결과가 비어 있는 경우가 많다.
    """
    for lang in (language, "en-US"):
        try:
            payload = _request(config, f"/movie/{movie_id}/videos", {"language": lang}, now)
        except TmdbError:
            return None  # 예고편은 부가 정보다. 여기서 전체를 실패시키지 않는다.

        video = _pick_trailer(payload.get("results") or [])
        if video:
            return f"https://www.youtube.com/embed/{video['key']}?autoplay=1"

    return None


def _to_hero(item, trailer=None):
    """TMDB 항목 → 상단 배너.

    배경은 가로 이미지(backdrop)를 쓴다. 포스터를 늘리면 화질이 뭉개진다.
    trailer 가 있으면 재생 버튼이 그 예고편을 튼다.
    """
    card = _to_card(item)
    backdrop = item.get("backdrop_path")

    return {
        "title": card["title"],
        "desc": card["desc"],
        "trailer": trailer,
        "bgImage": f"{IMG_BACKDROP}{backdrop}" if backdrop else None,
        "heroInfo": {
            "title": card["title"],
            "desc": card["desc"],
            "tags": card["tags"],
            "period": card["period"],
            "role": card["role"],
            "img": f"{IMG_BACKDROP}{backdrop}" if backdrop else card["img"],
        },
    }


def trending(config, now, limit=12, language="ko-KR"):
    """이번 주 인기 영화.

    반환값: {"hero": {...} | None, "items": [카드, ...]}
    """
    payload = _request(
        config,
        "/trending/movie/week",
        {"language": language},
        now,
    )

    results = payload.get("results") or []
    if not results:
        return {"hero": None, "items": []}

    # 배경 이미지가 있는 첫 항목을 배너로 쓴다. 없으면 그냥 첫 항목.
    banner = next((r for r in results if r.get("backdrop_path")), results[0])

    # 예고편은 배너 한 편만 받아온다. 카드마다 받으면 요청이 12배가 된다.
    trailer = _trailer_url(config, banner["id"], now, language) if banner.get("id") else None

    return {
        "hero": _to_hero(banner, trailer),
        "items": [_to_card(r) for r in results[:limit]],
    }
