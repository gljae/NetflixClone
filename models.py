from datetime import datetime

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    # 비밀번호 없이 가입 링크(신규)/OTP(기존 계정)로만 로그인하므로 비밀번호 컬럼은 두지 않는다.
    marketing_opt_in = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"


class SignupRequest(db.Model):
    __tablename__ = "signup_requests"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, index=True)
    # secrets.token_urlsafe(32)로 생성한, 추측 불가능한 1회용 토큰.
    token = db.Column(db.String(64), unique=True, nullable=False, index=True)
    marketing_opt_in = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used_at = db.Column(db.DateTime, nullable=True)

    def is_valid(self):
        return self.used_at is None and datetime.utcnow() < self.expires_at

    def __repr__(self):
        return f"<SignupRequest {self.email}>"


# 4자리 숫자는 경우의 수가 10,000개뿐이라, 무제한으로 재시도하면 뚫릴 수 있다.
# 한 코드당 시도 횟수를 제한해서 무차별 대입을 막는다.
MAX_OTP_ATTEMPTS = 5


class LoginOtp(db.Model):
    """기존 계정 로그인용 4자리 OTP. 신규 가입은 SignupRequest(가입 링크)를 그대로 쓰고,
    이미 가입된 이메일로 로그인할 때만 이 테이블을 사용한다."""

    __tablename__ = "login_otps"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, index=True)
    # secrets로 생성한 4자리 숫자 문자열 (예: "0042"). 0-padding을 위해 문자열로 저장한다.
    code = db.Column(db.String(4), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used_at = db.Column(db.DateTime, nullable=True)
    # 틀린 코드를 입력할 때마다 증가. MAX_OTP_ATTEMPTS에 도달하면 이 코드는 더 이상 못 쓴다.
    attempts = db.Column(db.Integer, nullable=False, default=0)

    def is_valid(self):
        return (
            self.used_at is None
            and datetime.utcnow() < self.expires_at
            and self.attempts < MAX_OTP_ATTEMPTS
        )

    def __repr__(self):
        return f"<LoginOtp {self.email}>"
