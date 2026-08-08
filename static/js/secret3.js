/**
 * secret3.js - 시크릿 3 프로필 전용 커스텀 스크립트 및 데이터
 * 
 * 시크릿 3 프로필의 메인 테마, 프로젝트 목록, 취미 및 페이지 꾸미기 로직을 작성할 수 있습니다.
 */

window.secret3Data = {
    key: 'secret3',
    name: '남기재',
    avatarClass: 'avatar-secret3',
    emoji: '',
    rowProjectsTitle: '<i class="fa-solid fa-gamepad" style="color:#ff6f00;"></i> 좋아하는',
    hero: {
        badge: '<i class="fa-solid fa-mask" style="color:#ff6f00;"></i> SECRET 3 CYBER LAB',
        title: 'AI개발자 & 자취',
        desc: '자취생 AI개발자의 연구소입니다.',
        bgYoutube: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1&mute=1&loop=1&playlist=MSv7NbfbtU8&controls=0&showinfo=0&rel=0',
        bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
        demoYoutube: 'https://www.youtube.com/embed/MSv7NbfbtU8?autoplay=1',
        heroInfo: {
            title: 'Qwen 3.6 35B-A3B 로컬 운영',
            desc: '로컬 모델을 이용해 최적화 AI 연구',
            tags: 'Local, Q4_K_M, MoE',
            period: '2026',
            role: '해보고 싶은 것',
            link: 'https://github.com/',
            img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80'
        }
    },
    projects: [
        {
            title: '자취남 영상 모음집',
            desc: '자취남 영상 중 재미있던 영상만 추려봤습니다.',
            tags: '자취',
            period: '2026',
            role: '시크릿 3 픽',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXI3MS26Gsj_go6Z-wpndIpdOr6wJaJI6ycN3Iz0Gwcg&s=10',
            displayTags: ['Studio', 'livingAlone'],
            episodes: [
                {
                    num: '1',
                    title: '인테리어와 정리정돈이 이정도면 예술이라 부르자 ll 논현 11평 전세',
                    desc: '모든걸 외워서 소개하는',
                    youtubeVideo: 'https://www.youtube.com/watch?v=50BYXr4Bcec',
                    img: '/static/img/gijae01.jpg'
                },
                {
                    num: '2',
                    title: '요즘 강남 하이엔드 오피스텔 근황 l 11평 관리비가 50만원이요..? l 강남 오피스텔 전세',
                    desc: '관리비가 50만원!?',
                    youtubeVideo: 'https://www.youtube.com/watch?v=9L2VzlM-ej8',
                    img: '/static/img/gijae02.jpg'
                }
            ]
        },
        {
            title: 'G무비',
            desc: '영화 드라마 요약',
            tags: '드라마, 영화',
            period: '2026',
            role: '시크릿 3 픽',
            img: '/static/img/gijae13.jpg',
            displayTags: ['Studio', 'livingAlone'],
            episodes: [
                {
                    num: '1',
                    title: '≪유부녀 킬러≫',
                    desc: '미친.. 1억뷰 원작 웹툰 시나리오 보자마자, 공효진이 배우 경력 27년 만에 처음으로 실사 드라마 출연 결심해버린, 싱크로율 58000% 신작',
                    youtubeVideo: 'https://www.youtube.com/watch?v=Zl3U-9QX-38',
                    img: '/static/img/gijae03.jpg'
                },
                {
                    num: '2',
                    title: '≪킬러들의 쇼핑몰≫',
                    desc: '전 세계를 휩쓴 대한민국 최고의 킬러물 1위..',
                    youtubeVideo: 'https://www.youtube.com/watch?v=D9pGhSMT44A',
                    img: '/static/img/gijae05.jpg'
                }
            ]
        }
    ],
    hobbies: [
        {
            title: '노래',
            desc: '좋은 노래들',
            tags: 'Song, artist',
            period: 'Always',
            role: 'Vocalist',
            img: '/static/img/gijae16.jpg',
            displayTags: ['Studio', 'Subculture'],
            episodes: [
                {
                    num: '1',
                    title: '입춘 - 한로로',
                    desc: '나의 발화(發花)를 기록하기 위한 곡입니다. 불확실한 봄맞이를 결심해 준 그대에게 이 곡을 전합니다.',
                    youtubeVideo: 'https://www.youtube.com/watch?v=pNi9PjmbUrI',
                    img: '/static/img/gijae11.jpg'
                },
                {
                    num: '2',
                    title: '탈출속도 - 경서',
                    desc: '지구 중력의 영향을 벗어나 지구를 탈출할 수 있는 속도 초속 11.2km. 너에게 도달하기 위해서는 얼마나의 속도가 필요할까. 누구에게나 앞으로 나아가는 것을 방해하는 것들이 있다. 힘들었던 기억, 상처, 아픔 모든 것을 끊어내고 너에게로 달려가는 지금 우리는 탈출속도에 결국 도달한다.',
                    youtubeVideo: 'https://www.youtube.com/watch?v=YBX9efP15eU&list=RDYBX9efP15eU&start_radio=1',
                    img: '/static/img/gijae12.jpg'
                },
                {
                    num: '3',
                    title: 'I DO ME - KiiiKiii',
                    desc: '타이틀곡 ‘I DO ME’는 ‘이걸 해야 돼’, ‘거길 가야 돼’ 하는 세상의 참견에 자신의 직감을 믿고 “난 내가 될 거예요”라고 말하는 주체적인 소녀를 그려낸 팝 댄스곡이다. 단번에 귀를 사로잡는 풍부한 보컬 멜로디와 경쾌함을 더하는 그루브한 리듬이 어우러져 곡의 완성도를 높였다. 가장 순수하게 날 것 그대로 보여줄 수 있는 시기, 억지스럽지 않고 자유분방한 매력으로 멋과 재미를 추구하는 KiiiKiii는 수많은 질문에 스스로 답하며 ‘결국 내가 가는 길이야’라는 확신을 갖는다.',
                    youtubeVideo: 'https://www.youtube.com/watch?v=hAEfi_SKTEU',
                    img: '/static/img/gijae04.jpg'
                }
            ]
        }
    ]
};

/**
 * hobbies 카드에 episodes 를 붙인다.
 *
 * profile.js 의 hobbies 렌더러는 projects 와 달리 data-episodes 속성을
 * 만들어 주지 않는다. 그래서 hobbies 에 episodes 를 적어도 모달의 회차
 * 목록까지 값이 전달되지 않는다. 렌더링이 끝난 뒤 카드에 직접 채워 넣어
 * 그 간극을 메운다.
 *
 * profile.js 를 고칠 수 있게 되면 이 함수는 통째로 지워도 된다.
 */
function attachHobbyEpisodes() {
    const hobbies = (window.secret3Data && window.secret3Data.hobbies) || [];
    const cards = document.querySelectorAll('#row-hobbies .row-cards .card');

    cards.forEach(card => {
        const hobby = hobbies.find(h => h.title === card.dataset.title);
        if (hobby && hobby.episodes && hobby.episodes.length > 0) {
            // profile.js 가 decodeURIComponent + JSON.parse 로 읽는다.
            card.dataset.episodes = encodeURIComponent(JSON.stringify(hobby.episodes));
        }
    });
}

/* ------------------------------------------------------------------ TMDB
 *
 * 서버의 /api/tmdb/trending 이 이번 주 인기 영화를 내려준다. API 키는
 * 서버(.env)에만 있고 여기로는 오지 않는다.
 *
 * 받은 데이터는 두 군데에 꽂는다.
 *   상단 배너   secret3Data.hero
 *   3번째 행    secret3Data.interests  (#row-interests, 평소엔 숨어 있다)
 *
 * projects / hobbies 는 직접 만든 내용이라 건드리지 않는다.
 */

//: 받아온 TMDB 응답. 아직 안 왔으면 null.
let tmdbCache = null;

//: 데이터가 늦게 도착했을 때 화면을 딱 한 번만 다시 그리게 하는 빗장.
let tmdbRerendered = false;

/**
 * 페이지가 열리자마자 미리 받아둔다.
 *
 * 프로필을 고르려면 사용자가 클릭을 해야 하므로, 대개 그 전에 도착한다.
 * 실패하면 조용히 넘어간다 — TMDB 가 죽어도 프로필 화면은 그대로 떠야 한다.
 */
const tmdbReady = fetch('/api/tmdb/trending')
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
        tmdbCache = data;
        return data;
    })
    .catch(() => null);

//: 배너 재생 버튼의 원래 라벨("데모 보기"). 다른 프로필로 돌아갈 때 되돌린다.
let heroPlayLabelOriginal = null;

/**
 * 배너 재생 버튼 라벨을 바꾼다.
 *
 * 버튼 텍스트는 profile.html 에 박혀 있고 profile.js 가 건드리지 않는다.
 * 시크릿 3 은 TMDB 예고편을 틀기 때문에 "데모 보기" 라는 이름이 맞지 않는다.
 * 팀 파일을 고치는 대신 여기서 DOM 만 바꾼다.
 */
function setHeroPlayLabel(text) {
    const btn = document.getElementById('heroPlayBtn');
    if (!btn) return;

    if (heroPlayLabelOriginal === null) heroPlayLabelOriginal = btn.innerHTML;
    btn.innerHTML = text === null
        ? heroPlayLabelOriginal
        : `<i class="fa-solid fa-play"></i> ${text}`;
}

/**
 * 다른 프로필로 넘어가면 버튼 라벨을 원래대로 돌린다.
 *
 * 라벨을 DOM 에서 직접 바꾸는 방식이라, 그냥 두면 시크릿 1·2 에서도
 * "예고편 보기" 가 남는다. 그쪽 훅은 우리가 건드릴 수 없으니 프로필
 * 카드 클릭을 직접 듣는다.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.dataset.profile !== 'secret3') setHeroPlayLabel(null);
        });
    });
});

/* --------------------------------------------------- 인기 영화 행 넘기기
 *
 * .row-cards 는 profile.css 에서 이미 가로 스크롤(overflow-x:auto,
 * scroll-behavior:smooth)이지만 스크롤바를 숨겨놔서, 마우스만으로는 다음
 * 카드로 넘어갈 방법이 없다. 넷플릭스처럼 좌우 화살표를 얹는다.
 *
 * TMDB 행(#row-interests)에만 붙인다. 이 행은 시크릿 3 만 쓰기 때문에
 * 다른 프로필 화면에는 나타나지 않는다.
 */

//: 화살표 스타일을 한 번만 넣기 위한 표시.
let arrowStyleInjected = false;

function injectArrowStyle() {
    if (arrowStyleInjected) return;
    arrowStyleInjected = true;

    const style = document.createElement('style');
    style.textContent = `
        .s3-arrow {
            position: absolute;
            top: 1rem;
            bottom: 1rem;
            width: 52px;
            z-index: 5;
            border: 0;
            cursor: pointer;
            color: #fff;
            font-size: 1.5rem;
            background: rgba(20, 20, 20, 0.6);
            opacity: 0;
            transition: opacity .2s ease, background .2s ease;
        }
        .s3-arrow:hover { background: rgba(20, 20, 20, 0.85); }
        .s3-arrow-prev { left: 0; border-radius: 0 4px 4px 0; }
        .s3-arrow-next { right: 0; border-radius: 4px 0 0 4px; }
        /* 행에 마우스를 올렸을 때만 보인다. 넷플릭스와 같은 동작. */
        .row-container:hover .s3-arrow { opacity: 1; }
        /* 끝에 닿으면 그쪽 화살표는 숨긴다. */
        .s3-arrow[hidden] { display: none; }
        /* 키보드 포커스는 hover 와 무관하게 보여야 한다. */
        .s3-arrow:focus-visible { opacity: 1; outline: 2px solid #ff6f00; }
    `;
    document.head.appendChild(style);
}

/**
 * TMDB 행에 좌우 화살표를 붙인다. 카드가 그려진 뒤에 불러야 한다.
 *
 * 프로필을 다시 고르면 profile.js 가 카드를 새로 그리지만 .row-container
 * 자체는 그대로라, 화살표는 한 번만 만들고 이후에는 상태만 갱신한다.
 */
function setupRowArrows() {
    const row = document.getElementById('row-interests');
    if (!row) return;

    const container = row.querySelector('.row-container');
    const track = row.querySelector('.row-cards');
    if (!container || !track) return;

    injectArrowStyle();

    let prev = container.querySelector('.s3-arrow-prev');
    let next = container.querySelector('.s3-arrow-next');

    if (!prev) {
        prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 's3-arrow s3-arrow-prev';
        prev.setAttribute('aria-label', '이전 영화');
        prev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

        next = document.createElement('button');
        next.type = 'button';
        next.className = 's3-arrow s3-arrow-next';
        next.setAttribute('aria-label', '다음 영화');
        next.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        // 한 번에 화면 너비만큼. 살짝 덜 밀어서 앞 카드가 걸쳐 보이게 한다.
        const step = () => Math.max(track.clientWidth * 0.85, 200);
        prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
        next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

        container.append(prev, next);

        track.addEventListener('scroll', () => updateRowArrows(track, prev, next));
        window.addEventListener('resize', () => updateRowArrows(track, prev, next));
    }

    updateRowArrows(track, prev, next);
}

/** 스크롤 위치에 따라 화살표를 보이거나 숨긴다. */
function updateRowArrows(track, prev, next) {
    // 넘칠 게 없으면 둘 다 숨긴다.
    const overflow = track.scrollWidth - track.clientWidth;
    if (overflow <= 1) {
        prev.hidden = true;
        next.hidden = true;
        return;
    }

    // 소수점 오차 때문에 끝에서도 1~2px 이 남는다. 여유를 준다.
    prev.hidden = track.scrollLeft <= 1;
    next.hidden = track.scrollLeft >= overflow - 1;
}

/** TMDB 데이터를 secret3Data 에 반영한다. profile.js 가 그리기 전에 불러야 한다. */
function applyTmdb(data) {
    if (!data) return;

    if (data.hero) {
        const hero = window.secret3Data.hero;
        hero.title = data.hero.title;
        hero.desc = data.hero.desc;
        if (data.hero.heroInfo) hero.heroInfo = data.hero.heroInfo;

        if (data.hero.bgImage) {
            hero.bgImage = data.hero.bgImage;
            // profile.js 는 bgYoutube 가 있으면 영상을 우선한다. 배경 이미지를
            // 보여주려면 비워야 한다.
            hero.bgYoutube = null;
        }

        // 재생 버튼이 이 영화의 예고편을 틀게 한다. profile.js 가 렌더링할 때
        // hero.demoYoutube 를 읽어가므로, 이 대입은 그리기 전에 끝나야 한다.
        if (data.hero.trailer) {
            hero.demoYoutube = data.hero.trailer;
            setHeroPlayLabel('예고편 보기');
        }
    }

    if (data.items && data.items.length > 0) {
        window.secret3Data.rowInterestsTitle =
            '<i class="fa-solid fa-fire" style="color:#ff6f00;"></i> 이번 주 TMDB 인기 영화';
        window.secret3Data.interests = data.items;
    }
}

// 시크릿 3 프로필이 활성화될 때 실행될 커스텀 로직
window.onSecret3Active = function () {
    console.log("🕵️ [시크릿 3] 프로필 활성화됨: 네온 오렌지 포인트 테마 적용");
    document.documentElement.style.setProperty('--netflix-red', '#ff6f00');

    // 이 훅은 카드가 그려지기 전에 호출된다. 렌더링이 끝난 뒤로 미룬다.
    setTimeout(() => {
        attachHobbyEpisodes();
        setupRowArrows();
    }, 0);

    if (tmdbCache) {
        // 이미 도착했다. 지금 넣으면 profile.js 가 그대로 그려준다.
        applyTmdb(tmdbCache);
        return;
    }

    // 아직 안 왔다. 도착하면 프로필 카드를 다시 눌러 렌더링을 한 번 더 돌린다.
    // 그래야 카드 클릭·모달 연결까지 profile.js 가 알아서 처리해 준다.
    tmdbReady.then(data => {
        if (!data || tmdbRerendered) return;
        tmdbRerendered = true;
        applyTmdb(data);

        const card = document.querySelector('.profile-card[data-profile="secret3"]');
        if (card) card.click();
    });
};
