"""DB 모델.

비밀번호를 아예 쓰지 않는다. 대신 이메일로 본인 확인을 두 가지 방식으로 한다.

    신규 가입  SignupRequest  매직링크(1회용 URL), 15분
    기존 로그인 LoginOtp       4자리 코드, 5분, 5회 시도 제한

가입은 링크, 로그인은 코드로 나눈 이유는 실제 넷플릭스와 같다. 링크는 클릭
한 번이라 처음 가입할 때 편하고, 코드는 기기를 옮겨가며 입력할 수 있어서
TV·콘솔처럼 링크를 누르기 어려운 환경에서도 통한다.
"""

import secrets
from datetime import datetime, timedelta, timezone

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_

db = SQLAlchemy()

#: 매직링크(가입) 유효 시간
TOKEN_TTL = timedelta(minutes=15)

#: OTP(로그인) 유효 시간. 링크보다 짧게 둔다 — 4자리라 추측 여지가 있다.
OTP_TTL = timedelta(minutes=5)

#: 4자리는 경우의 수가 10,000 개뿐이라 무제한 재시도하면 뚫린다.
#: 코드 하나당 시도 횟수를 제한해 무차별 대입을 막는다.
MAX_OTP_ATTEMPTS = 5

#: 죽은 토큰을 얼마나 더 남겨둘지.
#: 곧바로 지우면 "링크를 눌렀는데 왜 안 되지?" 를 추적할 방법이 없어진다.
#: 만료·사용 직후가 아니라 하루 지난 것부터 치운다.
TOKEN_RETENTION = timedelta(days=1)


def utcnow():
    """naive UTC 시각.

    SQLite 는 타임존 정보를 보존하지 않아서, aware/naive 를 섞으면
    비교할 때 TypeError 가 난다. 저장도 비교도 전부 이 함수로 통일한다.
    """
    return datetime.now(timezone.utc).replace(tzinfo=None)


class User(UserMixin, db.Model):
    """가입한 계정.

    UserMixin 은 Flask-Login 이 요구하는 is_authenticated / get_id() 같은
    속성을 채워준다. 컬럼이 늘어나지는 않는다.
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    marketing_opt_in = db.Column(db.Boolean, nullable=False, default=False)

    # 아래 두 컬럼이 NULL 이면 "가입 절차를 끝내지 않은 계정" 이다.
    # 매직링크를 확인한 시점에 레코드를 먼저 만들기 때문에 생기는 상태.
    plan_code = db.Column(db.String(20))
    signup_completed_at = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    @property
    def is_signup_complete(self):
        return self.signup_completed_at is not None

    def __repr__(self):
        return f"<User {self.email}>"


class SignupRequest(db.Model):
    """회원가입 매직링크 토큰. 1회용.

    [로그인 연결]
    로그인도 결국 "메일로 1회용 링크를 보내고 확인한다" 라서 이 테이블을
    그대로 쓸 수 있다. 아래 컬럼을 추가하고 issue() 에 인자를 하나 늘리면 된다.

        purpose = db.Column(db.String(10), nullable=False, default="signup")
        # "signup" 또는 "login"

    그러면 app.py 의 signup_verify() 에서 purpose 로 분기한다.
        signup → 계정 생성 후 플랜 선택으로
        login  → 계정 조회만 하고 홈으로

    marketing_opt_in 은 회원가입에서만 쓰는 값이다. 로그인 토큰에서는
    그냥 기본값(False)으로 두고 무시하면 된다.

    클래스 이름도 MagicToken 정도로 바꾸는 게 정확해지지만, __tablename__
    을 바꾸면 기존 DB 파일과 안 맞는다. db.create_all() 만 쓰고 마이그레이션
    도구가 없으니 이름을 바꿀 땐 instance/netflix_clone.db 를 지워야 한다.
    """

    __tablename__ = "signup_requests"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, index=True)
    token = db.Column(db.String(64), unique=True, nullable=False, index=True)
    marketing_opt_in = db.Column(db.Boolean, nullable=False, default=False)

    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used_at = db.Column(db.DateTime)

    @classmethod
    def issue(cls, email, marketing_opt_in):
        """새 토큰을 만들어 돌려준다. commit 은 호출한 쪽에서 한다."""
        now = utcnow()
        return cls(
            email=email,
            token=secrets.token_urlsafe(32),
            marketing_opt_in=marketing_opt_in,
            created_at=now,
            expires_at=now + TOKEN_TTL,
        )

    @property
    def is_expired(self):
        return self.expires_at <= utcnow()

    @property
    def is_used(self):
        return self.used_at is not None

    def __repr__(self):
        return f"<SignupRequest {self.email} used={self.is_used}>"


class LoginOtp(db.Model):
    """기존 계정 로그인용 4자리 코드.

    신규 가입은 SignupRequest(매직링크)를 쓰고, 이미 가입된 이메일로
    로그인할 때만 이 테이블을 쓴다.
    """

    __tablename__ = "login_otps"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, index=True)
    #: 4자리 숫자 문자열. "0042" 처럼 앞자리 0 을 살려야 해서 정수가 아니라 문자열.
    code = db.Column(db.String(4), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used_at = db.Column(db.DateTime)
    #: 틀린 코드를 넣을 때마다 증가. MAX_OTP_ATTEMPTS 에 닿으면 이 코드는 폐기.
    attempts = db.Column(db.Integer, nullable=False, default=0)

    @classmethod
    def issue(cls, email):
        """새 코드를 만들어 돌려준다. commit 은 호출한 쪽에서 한다."""
        now = utcnow()
        return cls(
            email=email,
            code=f"{secrets.randbelow(10000):04d}",
            created_at=now,
            expires_at=now + OTP_TTL,
        )

    @property
    def is_expired(self):
        return self.expires_at <= utcnow()

    @property
    def is_usable(self):
        return (
            self.used_at is None
            and not self.is_expired
            and self.attempts < MAX_OTP_ATTEMPTS
        )

    @property
    def attempts_left(self):
        return max(0, MAX_OTP_ATTEMPTS - self.attempts)

    def __repr__(self):
        return f"<LoginOtp {self.email} attempts={self.attempts}>"


# ------------------------------------------------------------ 토큰 정리

#: 정리 대상 테이블. 둘 다 email/expires_at/used_at 구조가 같아서 한 함수로 돈다.
PURGEABLE = (SignupRequest, LoginOtp)


def _is_dead_before(model, cutoff):
    """cutoff 시점에 이미 죽어 있던 토큰을 고르는 조건.

    죽은 시각의 기준이 두 가지다.
        이미 쓴 토큰   used_at    (쓴 순간 죽는다)
        안 쓴 토큰     expires_at (만료되면서 죽는다)

    아직 살아 있는 토큰은 어느 쪽에도 걸리지 않는다 — 그게 이 함수의 핵심이다.
    """
    return or_(
        and_(model.used_at.isnot(None), model.used_at < cutoff),
        and_(model.used_at.is_(None), model.expires_at < cutoff),
    )


def purge_expired_tokens(retention=TOKEN_RETENTION, dry_run=False):
    """더 못 쓰고 보관 기간도 지난 토큰을 지운다.

    유효한 토큰은 절대 건드리지 않는다. 진행 중인 가입·로그인이 끊기면 안 된다.

    dry_run=True 면 지우지 않고 대상 건수만 센다.
    반환값: {"signup_requests": n, "login_otps": n}
    """
    cutoff = utcnow() - retention
    counts = {}
    for model in PURGEABLE:
        query = model.query.filter(_is_dead_before(model, cutoff))
        counts[model.__tablename__] = (
            query.count()
            if dry_run
            else query.delete(synchronize_session=False)
        )
    if not dry_run:
        db.session.commit()
    return counts
