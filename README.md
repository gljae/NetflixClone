# 넷플릭스 클론 프로젝트

넷플릭스를 그대로 따라 하는 대신, 팀원 각자의 취향을 담은 개인화된 콘텐츠 플랫폼으로 재해석했습니다.

로그인 후 프로필을 선택하면 팀원 한 명 한 명의 "시크릿 라이브러리"가 펼쳐집니다. TMDB API로 실시간 영화 데이터와 예고편을 가져오고, 프로필마다 좋아하는 음악·영상·콘텐츠를 직접 큐레이션했습니다.

## 주요 기능

- Gmail + OTP 인증으로 간편 회원가입/로그인
- 팀원별 커스텀 프로필 — 각자의 취향이 담긴 콘텐츠 라이브러리
- TMDB API 연동 — 실시간 인기 영화 데이터, 예고편, 영화 순위 제공
- 넷플릭스 스타일의 반응형 UI/UX

## 기술 스택

- **Backend**: Flask (Python), Flask-Login
- **Frontend**: HTML, CSS, Vanilla JS
- **API**: TMDB (The Movie Database)
- **Infra**: AWS EC2, systemd + gunicorn
- **기타**: python-dotenv

## 팀원 & 역할

| 이름 | 프로필 | 담당 |
| --- | --- | --- |
| 김건우 | secret1 | 장르별 취향 곡을 담은 플레이리스트 프로필 |
| 김시은 | secret2 | 재밌게 본 유튜브 영상 콘텐츠 프로필 |
| 남기재 | secret3 | TMDB API 연동 — 영화 데이터/예고편/순위 |

## 실행 방법

```bash
git clone <repo-url>
cd NetflixClone
cp .env.example .env   # .env에 필요한 키 값 채우기
pip install -r requirements.txt
python app.py
```

## 트러블슈팅 & 배운 점

**Git 협업 시 팀원 작업 충돌 방지**

3명이 각자 프로필 파일(secret1.js / secret2.js / secret3.js)로 작업 영역을 분리해 충돌을 최소화했습니다. push 전에는 항상 `git fetch` + `merge`로 원격 변경사항을 먼저 확인한 뒤 반영하는 규칙을 세워, 팀원의 작업을 실수로 덮어쓰는 사고를 방지했습니다.

**민감 정보(API 키) 관리**

TMDB API 키 등 민감 정보는 `.env`에 저장하고 `.gitignore`로 git 추적에서 제외했습니다. 대신 `.env.example`에 필요한 키 이름만 문서화해 팀원 누구나 자신의 키를 넣고 바로 실행할 수 있도록 했고, 실제 키 값이 저장소에 노출되는 것을 방지했습니다.
