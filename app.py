import os
import re
import secrets
import smtplib
from datetime import datetime, timedelta
from email.mime.text import MIMEText

from dotenv import load_dotenv
from flask import Flask, flash, get_flashed_messages, redirect, render_template, request, session, url_for
from flask_login import LoginManager, current_user, login_required, login_user, logout_user

from models import MAX_OTP_ATTEMPTS, LoginOtp, SignupRequest, User, db

load_dotenv()

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
SIGNUP_LINK_TTL_MINUTES = 15
OTP_TTL_MINUTES = 5


def _send_email(to_email, subject, body):
    """실제 메일 발송 공통 로직. SMTP_USER/SMTP_PASSWORD가 없으면
    개발 환경에서 앱이 죽지 않도록 콘솔에 내용을 출력하는 것으로 대신한다."""
    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    from_name = os.environ.get("MAIL_FROM_NAME", "Netflix Clone")

    message = MIMEText(body)
    message["Subject"] = subject
    message["From"] = f"{from_name} <{smtp_user}>" if smtp_user else from_name
    message["To"] = to_email

    if not smtp_user or not smtp_password:
        # 팀원이 아직 SMTP_USER/SMTP_PASSWORD를 설정하지 않았을 때를 위한 개발용 대체 경로.
        print(f"[dev-mail] SMTP 설정이 없어 메일 대신 콘솔에 출력합니다 -> {to_email}\n{body}")
        return

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [to_email], message.as_string())


def send_signup_email(email, verify_url):
    """신규 가입자에게 [계정 등록] 링크를 보낸다. (기존 계정 로그인은 OTP를 쓰므로 여기서 다루지 않는다.)"""
    body = (
        f"안녕하세요,\n\n"
        f"아래 [계정 등록] 링크를 눌러 가입을 완료해주세요.\n"
        f"{verify_url}\n\n"
        f"이 링크는 {SIGNUP_LINK_TTL_MINUTES}분 후에 만료됩니다.\n"
        f"본인이 요청하지 않았다면 이 메일을 무시하셔도 됩니다."
    )
    _send_email(email, "계정 등록을 완료해주세요", body)


def send_login_otp_email(email, code):
    """기존 계정 로그인용 4자리 코드를 보낸다."""
    body = (
        f"안녕하세요,\n\n"
        f"로그인을 위한 인증 코드는 [{code}] 입니다.\n\n"
        f"이 코드는 {OTP_TTL_MINUTES}분 후에 만료됩니다.\n"
        f"본인이 요청하지 않았다면 이 메일을 무시하셔도 됩니다."
    )
    _send_email(email, "로그인 인증 코드", body)


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-this-secret-key")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL", "sqlite:///netflix_clone.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = "login"  # @login_required가 막은 요청을 로그인 페이지로 보낸다.
    login_manager.login_message = "로그인이 필요한 페이지입니다."
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        # Flask-Login이 세션에 저장된 user_id로 현재 사용자를 다시 찾아온다.
        return db.session.get(User, int(user_id))

    with app.app_context():
        # 과제용/소규모 앱에서는 실행 시 테이블을 보장하면 바로 테스트하기 쉽다.
        db.create_all()

    @app.route("/")
    def index():
        if current_user.is_authenticated:
            return redirect(url_for("mypage"))
        return redirect(url_for("login"))

    @app.route("/signup/consent", methods=["GET", "POST"])
    def signup_consent():
        email = session.get("signup_email")
        if not email:
            return redirect(url_for("login"))

        if request.method == "POST":
            agree_privacy = request.form.get("agree_privacy") == "on"
            marketing_opt_in = request.form.get("marketing_opt_in") == "on"

            if not agree_privacy:
                flash("개인정보 수집 및 이용에 동의해야 가입할 수 있습니다.", "error")
                return render_template("signup_consent.html", email=email)

            return _create_signup_request_and_send(email, marketing_opt_in)

        return render_template("signup_consent.html", email=email)

    @app.route("/signup/pending")
    def signup_pending():
        email = session.get("signup_email")
        if not email:
            return redirect(url_for("login"))
        return render_template("signup_pending.html", email=email)

    @app.route("/signup/resend")
    def signup_resend():
        email = session.get("signup_email")
        if not email:
            return redirect(url_for("login"))
        previous = (
            SignupRequest.query.filter_by(email=email).order_by(SignupRequest.created_at.desc()).first()
        )
        marketing_opt_in = previous.marketing_opt_in if previous else False
        return _create_signup_request_and_send(email, marketing_opt_in, flash_message="인증 메일을 다시 보냈습니다.")

    @app.route("/signup/verify/<token>")
    def signup_verify(token):
        signup_request = SignupRequest.query.filter_by(token=token).first()

        if not signup_request or not signup_request.is_valid():
            flash("인증 링크가 유효하지 않거나 만료되었습니다. 다시 시도해주세요.", "error")
            return redirect(url_for("login"))

        user = User.query.filter_by(email=signup_request.email).first()
        is_new_user = user is None
        if is_new_user:
            user = User(
                email=signup_request.email,
                marketing_opt_in=signup_request.marketing_opt_in,
            )
            db.session.add(user)

        signup_request.used_at = datetime.utcnow()
        db.session.commit()

        session.pop("signup_email", None)
        login_user(user)
        flash("가입이 완료되었습니다." if is_new_user else "로그인되었습니다.", "success")

        # /login에서 next 파라미터로 들어온 요청이면 원래 가려던 페이지로 보낸다.
        next_page = session.pop("post_login_next", None)
        if next_page:
            return redirect(next_page)
        return redirect(url_for("mypage"))

    def _start_login_flow(email):
        """이메일 존재 여부에 따라 로그인/가입을 분기한다.
        기존 계정이면 OTP 코드를 보내고, 신규 이메일이면 약관 동의 후 가입 링크를 보낸다."""
        if User.query.filter_by(email=email).first():
            return _create_login_otp_and_send(email)
        session["signup_email"] = email
        return redirect(url_for("signup_consent"))

    def _create_signup_request_and_send(email, marketing_opt_in, flash_message=None):
        token = secrets.token_urlsafe(32)
        signup_request = SignupRequest(
            email=email,
            token=token,
            marketing_opt_in=marketing_opt_in,
            expires_at=datetime.utcnow() + timedelta(minutes=SIGNUP_LINK_TTL_MINUTES),
        )
        db.session.add(signup_request)
        db.session.commit()

        base_url = os.environ.get("SITE_BASE_URL", request.url_root.rstrip("/"))
        verify_url = f"{base_url}{url_for('signup_verify', token=token)}"
        send_signup_email(email, verify_url)

        if flash_message:
            flash(flash_message, "success")
        return redirect(url_for("signup_pending"))

    def _create_login_otp_and_send(email, flash_message=None):
        # 새 코드를 발급하면 이전에 보낸 미사용 코드는 무효화한다 (항상 최신 코드만 유효).
        LoginOtp.query.filter_by(email=email, used_at=None).update({"used_at": datetime.utcnow()})

        code = f"{secrets.randbelow(10000):04d}"
        otp = LoginOtp(
            email=email,
            code=code,
            expires_at=datetime.utcnow() + timedelta(minutes=OTP_TTL_MINUTES),
        )
        db.session.add(otp)
        db.session.commit()

        send_login_otp_email(email, code)

        session["login_otp_email"] = email
        if flash_message:
            flash(flash_message, "success")
        return redirect(url_for("login_otp"))

    @app.route("/login", methods=["GET", "POST"])
    def login():
        if current_user.is_authenticated:
            return redirect(url_for("mypage"))

        if request.method == "POST":
            email = request.form.get("email", "").strip().lower()

            if not email:
                return render_template(
                    "login.html", email=email, email_error="유효한 이메일 주소나 휴대폰 번호를 입력하세요."
                )

            if not EMAIL_PATTERN.match(email):
                return render_template(
                    "login.html", email=email, email_error="정확한 이메일 주소를 입력하세요."
                )

            next_page = request.args.get("next")
            # 외부 URL로 튀는 open redirect를 막기 위해 내부 경로만 next로 허용한다.
            # 매직링크 클릭은 나중에 별도 요청으로 들어오므로 세션에 담아뒀다가 검증 시점에 사용한다.
            if next_page and next_page.startswith("/"):
                session["post_login_next"] = next_page

            return _start_login_flow(email)

        return render_template("login.html")

    @app.route("/login/otp", methods=["GET", "POST"])
    def login_otp():
        email = session.get("login_otp_email")
        if not email:
            return redirect(url_for("login"))

        if request.method == "POST":
            code = request.form.get("code", "").strip()

            otp = (
                LoginOtp.query.filter_by(email=email, used_at=None)
                .order_by(LoginOtp.created_at.desc())
                .first()
            )

            if not otp or not otp.is_valid():
                return render_template(
                    "login_otp.html",
                    email=email,
                    code_error="코드가 만료되었거나 시도 횟수를 초과했습니다. 코드를 다시 받아주세요.",
                )

            if otp.code != code:
                otp.attempts += 1
                db.session.commit()
                remaining = MAX_OTP_ATTEMPTS - otp.attempts
                if remaining <= 0:
                    return render_template(
                        "login_otp.html",
                        email=email,
                        code_error="시도 횟수를 초과했습니다. 코드를 다시 받아주세요.",
                    )
                return render_template(
                    "login_otp.html",
                    email=email,
                    code_error=f"코드가 올바르지 않습니다. ({remaining}회 남음)",
                )

            otp.used_at = datetime.utcnow()
            user = User.query.filter_by(email=email).first()
            db.session.commit()

            if not user:
                # 코드 발급 이후 계정이 삭제되는 등의 예외 상황. 처음부터 다시 시도하게 한다.
                session.pop("login_otp_email", None)
                flash("계정을 찾을 수 없습니다. 다시 시도해주세요.", "error")
                return redirect(url_for("login"))

            session.pop("login_otp_email", None)
            login_user(user)
            flash("로그인되었습니다.", "success")

            next_page = session.pop("post_login_next", None)
            if next_page:
                return redirect(next_page)
            return redirect(url_for("mypage"))

        return render_template("login_otp.html", email=email)

    @app.route("/login/otp/resend")
    def login_otp_resend():
        email = session.get("login_otp_email")
        if not email:
            return redirect(url_for("login"))
        return _create_login_otp_and_send(email, flash_message="인증 코드를 다시 보냈습니다.")

    @app.route("/logout")
    @login_required
    def logout():
        logout_user()  # 세션에서 로그인 사용자 정보를 제거한다.
        flash("로그아웃되었습니다.", "success")
        return redirect(url_for("login"))

    @app.route("/mypage")
    @login_required  # 로그인하지 않은 사용자는 login_view로 자동 리다이렉트된다.
    def mypage():
        # 이 페이지는 아직 flash 메시지를 화면에 표시하지 않는다(팀원이 실제 홈 화면으로 교체 예정).
        # 표시하지 않더라도 큐에서는 비워둬야, 로그인 성공 메시지가 다음 페이지(예: 로그아웃 후 /login)에
        # 엉뚱하게 다시 뜨는 걸 막을 수 있다.
        get_flashed_messages()
        return (
            "<h1>마이페이지</h1>"
            f"<p>{current_user.email}님, 로그인 상태입니다.</p>"
            '<p><a href="/logout">로그아웃</a></p>'
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5050)))
# 김시은 바보 뚱멍이가 뚱냥이보다 기여움 ㅋㅋㅋ