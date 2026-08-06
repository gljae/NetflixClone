"""DB 모델.

매직링크 전용이라 users 에 비밀번호 컬럼이 없다.

[로그인 연결]
로그인을 붙여도 테이블을 새로 만들 필요가 없다. SignupRequest 에 purpose
컬럼 하나만 추가하면 회원가입 토큰과 로그인 토큰을 한 테이블로 관리할 수
있다. 자세한 건 SignupRequest 의 주석 참고.
"""

import secrets
from datetime import datetime, timedelta, timezone

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#: 매직링크 유효 시간
TOKEN_TTL = timedelta(minutes=15)


def utcnow():
    """naive UTC 시각.

    SQLite 는 타임존 정보를 보존하지 않아서, aware/naive 를 섞으면
    비교할 때 TypeError 가 난다. 저장도 비교도 전부 이 함수로 통일한다.
    """
    return datetime.now(timezone.utc).replace(tzinfo=None)


class User(db.Model):
    """가입한 계정."""

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
