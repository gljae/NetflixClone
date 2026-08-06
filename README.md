# NetflixClone

Netflix를 저희 팀의 방식대로 클론을 제작합니다.

## 로그인 방식

비밀번호 없이 이메일만으로 인증합니다. `/login`에서 이메일을 입력하면, 서버가 가입 여부를 확인해서 자동으로 분기합니다.

```
이메일 입력 (/login)
    ↓
서버가 DB에서 계정 존재 여부 확인
    ↓
    ├── 등록 안 된 이메일 → 개인정보 동의 → [계정 등록] 링크 메일 발송 → 링크 클릭 시 계정 생성 + 로그인
    └── 이미 등록된 이메일 → 4자리 OTP 코드 메일 발송 → 코드 입력 시 로그인
```

- 가입 링크: 32바이트 랜덤 토큰, 15분 만료, 1회용
- OTP 코드: 4자리 숫자, 5분 만료, 5회 오답 시 잠금(무차별 대입 방지)
- 이메일 발송은 Gmail SMTP 사용 (`.env`에 `SMTP_USER`/`SMTP_PASSWORD` 없으면 콘솔 출력으로 대체되어 로컬 개발 시 메일 없이도 테스트 가능)

## 필요 연동 작업

**로그인/가입에 성공하면 현재는 임시 페이지(`/mypage`)로 이동합니다.** 프로필 선택 페이지가 완성되면, `app.py`에서 `redirect(url_for("mypage"))`로 되어 있는 아래 4곳을 프로필 선택 라우트로 바꿔주세요.

| 위치 | 상황 |
| --- | --- |
| `index()` (`/`) | 이미 로그인된 사용자가 루트 경로 접속 |
| `signup_verify()` | 가입 링크 클릭 후 계정 생성/로그인 성공 |
| `login()` | 이미 로그인된 사용자가 `/login` 접속 |
| `login_otp()` | OTP 코드 검증 성공 |

프로필 선택 라우트 이름이 예를 들어 `profile_select`라면, 저 네 곳을 `redirect(url_for("profile_select"))`로 바꾸면 됩니다. (`/mypage`는 지워도 되고, 남겨서 디버그용으로 써도 무방합니다.)

## DB 구조

Flask-SQLAlchemy(ORM) + PostgreSQL(Neon) 사용. 테이블 3개, `models.py`에 정의:

**`users`** — 가입 완료된 계정
- `id`, `email`(unique), `marketing_opt_in`, `created_at`
- 비밀번호 컬럼 없음 (이메일 인증만 사용)

**`signup_requests`** — 신규 가입용 링크 토큰
- `email`, `token`(1회용), `expires_at`, `used_at`, `marketing_opt_in`

**`login_otps`** — 기존 계정 로그인용 4자리 코드
- `email`, `code`, `expires_at`, `used_at`, `attempts`(오답 횟수)

마이그레이션 도구 없이 앱 시작 시 `db.create_all()`로 테이블을 자동 생성합니다.

## 로컬 실행 방법

1. 가상환경 활성화 후 `pip install -r requirements.txt`
2. `.env` 파일 생성 (`.env.example` 참고):
   ```
   SECRET_KEY=아무_랜덤_문자열
   DATABASE_URL=postgresql://...  # Neon 연결 문자열, 없으면 로컬 SQLite로 자동 대체
   SMTP_USER=Gmail 주소
   SMTP_PASSWORD=Gmail 앱 비밀번호
   MAIL_FROM_NAME=Netflix Clone
   SITE_BASE_URL=http://127.0.0.1:5050
   ```
3. `python app.py` → `http://127.0.0.1:5050` 접속

## 라우트 목록

| 경로 | 설명 |
| --- | --- |
| `/login` | 이메일 입력 (통합 진입점) |
| `/login/otp` | 기존 계정용 OTP 코드 입력 |
| `/login/otp/resend` | OTP 재발송 |
| `/signup/consent` | 신규 계정 개인정보 동의 |
| `/signup/pending` | 메일함 확인 안내 |
| `/signup/resend` | 가입 링크 재발송 |
| `/signup/verify/<token>` | 가입 링크 클릭 시 도착, 계정 생성+로그인 |
| `/mypage` | 로그인 후 임시 홈 (프로필 선택 페이지로 교체 예정) |
| `/logout` | 로그아웃 |
