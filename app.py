"""넷플릭스 클론 — 비밀번호 없는 회원가입 + 로그인.

랜딩에서 이메일을 받아, 가입 여부에 따라 두 갈래로 나뉜다.

    /                     랜딩(두둥 인트로 + 이메일 입력)
    POST /auth/check      갈림길
      │
      ├─ 이미 있는 계정 ─→ /login/code    [로그인] 4자리 코드 입력
      │                     └→ 가입 미완료면 /signup/plan, 아니면 /mypage
      │
      └─ 신규 이메일 ───→ /signup         [가입 1단계] 동의 + 매직링크 발송
                            /signup/sent    메일함 확인 안내
                            /signup/verify  토큰 검증 → 계정 생성 → 로그인
                            /signup/plan    [2단계] 멤버십 선택
                            /signup/payment [3단계] 결제 (미구현)
                            /signup/done    완료

    /logout               로그아웃
    /mypage               로그인 후 홈 (스텁)

왜 가입은 링크, 로그인은 코드인가
    링크는 클릭 한 번이라 처음 가입할 때 편하다. 반면 코드는 기기를 옮겨
    입력할 수 있어서, 메일은 폰으로 보고 입력은 TV 로 하는 상황에서도 통한다.
    실제 넷플릭스가 이렇게 나눠 쓴다.

세션은 Flask-Login 이 관리한다. current_user 로 어디서든 읽을 수 있고,
@login_required 를 붙이면 미로그인 요청이 /login 으로 튕긴다.
"""

import os
import re
from datetime import timedelta

import click
from dotenv import load_dotenv
from flask import (
    Flask,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

from mailer import effective_backend, send_login_code, send_magic_link
from models import (
    TOKEN_RETENTION,
    LoginOtp,
    SignupRequest,
    User,
    db,
    purge_expired_tokens,
    utcnow,
)
from plans import PLANS, ordered_plans

#: 완벽한 검증은 불가능하다. 오타를 걸러내는 정도로만 쓰고, 진짜 확인은
#: "메일이 실제로 도착하는가" 로 한다 — 매직링크 방식의 장점이기도 하다.
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

#: 재전송 쿨다운(초). 없으면 남의 메일함에 스팸을 보내는 도구가 된다.
#: 가입 링크와 로그인 코드가 각각 따로 센다.
RESEND_COOLDOWN = 60

#: 죽은 토큰 정리를 최소 이 간격으로만 돌린다.
#: 토큰을 낼 때마다 DELETE 를 날리는 건 낭비다.
PURGE_INTERVAL = timedelta(minutes=10)

#: 마지막으로 정리를 돌린 시각. 프로세스마다 따로 센다.
#: 워커가 여러 개면 그만큼 더 자주 돌 뿐이라, 정확할 필요가 없다.
_last_purge_at = None

# .env 에 적어둔 설정을 환경변수로 올린다. 파일이 없으면 조용히 넘어간다.
# SMTP 비밀번호 같은 건 .env 에만 두고 git 에는 올리지 않는다(.gitignore 참고).
load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config.update(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-secret-change-me"),
        SQLALCHEMY_DATABASE_URI=os.environ.get(
            "DATABASE_URL", "sqlite:///netflix_clone.db"
        ),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        # 메일: console = 터미널에 링크 출력(기본), smtp = 실제 발송
        MAIL_BACKEND=os.environ.get("MAIL_BACKEND", "console"),
        MAIL_SENDER=os.environ.get("MAIL_SENDER", "no-reply@netflix.local"),
        SMTP_HOST=os.environ.get("SMTP_HOST", "localhost"),
        SMTP_PORT=int(os.environ.get("SMTP_PORT", 587)),
        SMTP_USER=os.environ.get("SMTP_USER", ""),
        SMTP_PASSWORD=os.environ.get("SMTP_PASSWORD", ""),
    )

    # sqlite:/// 상대경로는 instance 폴더 기준으로 풀린다 → instance/netflix_clone.db
    os.makedirs(app.instance_path, exist_ok=True)

    db.init_app(app)

    login_manager = LoginManager()
    # @login_required 가 막은 요청이 갈 곳. 우리 로그인 입구는 랜딩이다.
    login_manager.login_view = "landing"
    login_manager.login_message = "로그인이 필요한 페이지입니다."
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        """세션에 저장된 id 로 사용자를 복원한다. Flask-Login 이 매 요청마다 부른다."""
        return db.session.get(User, int(user_id))

    with app.app_context():
        # 마이그레이션 도구를 안 쓴다. 없는 테이블만 새로 만든다
        # (login_otps 가 여기서 생긴다. 기존 users/signup_requests 는 건드리지 않는다).
        db.create_all()

    register_routes(app)
    return app


# ---------------------------------------------------------------- 헬퍼


def cooldown_remaining(key="signup_sent_at"):
    """재전송까지 남은 초. 0 이면 지금 보낼 수 있다.

    가입 링크와 로그인 코드가 서로 다른 세션 키를 쓴다. 한쪽을 보냈다고
    다른 쪽까지 막히면 안 되기 때문이다.
    """
    sent_at = session.get(key)
    if not sent_at:
        return 0
    elapsed = utcnow().timestamp() - sent_at
    return max(0, int(RESEND_COOLDOWN - elapsed))


def maybe_purge_tokens(app):
    """토큰을 새로 내는 김에 죽은 토큰을 치운다.

    별도 스케줄러(cron, Celery)를 붙이지 않으려고 이렇게 한다. 토큰이
    쌓이는 건 토큰을 발급할 때뿐이라, 발급 경로에 물려두면 충분하다.

    정리에 실패해도 가입·로그인은 계속돼야 하므로 예외를 삼킨다.
    """
    global _last_purge_at

    now = utcnow()
    if _last_purge_at and now - _last_purge_at < PURGE_INTERVAL:
        return
    _last_purge_at = now

    try:
        counts = purge_expired_tokens()
    except Exception:
        db.session.rollback()
        app.logger.exception("만료 토큰 정리 실패")
        return

    if any(counts.values()):
        app.logger.info(
            "만료 토큰 정리: signup_requests %d건, login_otps %d건 삭제",
            counts["signup_requests"],
            counts["login_otps"],
        )


def active_user():
    """지금 로그인된 사용자. 없으면 None.

    current_user 는 미로그인일 때 AnonymousUserMixin 을 돌려주므로
    None 비교가 안 된다. 그걸 감싸서 None 으로 통일한다.
    """
    return current_user if current_user.is_authenticated else None


def dev_link(config):
    """화면에 띄울 개발용 매직링크. 실제로 메일을 보내는 중이면 None.

    console 모드로 테스트하다 smtp 로 바꾸면 세션에 값이 남아 있어서,
    메일을 보냈는데도 화면에 링크가 노출될 수 있다. 그걸 막는다.
    """
    if effective_backend(config) == "smtp":
        return None
    return session.get("dev_magic_link")


def register_routes(app):
    # ------------------------------------------------------------ 랜딩

    @app.get("/")
    def landing():
        if current_user.is_authenticated:
            return redirect(url_for("mypage"))
        return render_template("landing.html")

    @app.post("/auth/check")
    def auth_check():
        """가입과 로그인이 갈라지는 지점.

        이미 계정이 있으면 로그인(4자리 코드), 없으면 가입(매직링크)으로 보낸다.
        가입하다 만 계정도 로그인으로 보낸다 — 계정 레코드가 있다는 건 이미
        매직링크로 이메일을 확인했다는 뜻이라, 처음부터 다시 시킬 이유가 없다.
        코드로 들어와서 멈췄던 단계부터 이어가면 된다.
        """
        email = (request.form.get("email") or "").strip().lower()

        if not EMAIL_RE.match(email):
            return (
                render_template(
                    "landing.html",
                    email=email,
                    error="정확한 이메일 주소를 입력해주세요.",
                ),
                400,
            )

        if User.query.filter_by(email=email).first():
            return start_login(app, email)

        session["signup_email"] = email
        return redirect(url_for("signup_start"))

    # ------------------------------------------------------------ 로그인

    def start_login(app, email, notice=None):
        """로그인 코드를 발급해 보내고 입력 화면으로 보낸다."""
        # 새 코드를 내면 이전에 보낸 미사용 코드는 무효화한다.
        # 항상 "마지막에 받은 코드" 하나만 유효해야 헷갈리지 않는다.
        LoginOtp.query.filter_by(email=email, used_at=None).update(
            {"used_at": utcnow()}
        )
        otp = LoginOtp.issue(email)
        db.session.add(otp)
        db.session.commit()

        maybe_purge_tokens(app)

        try:
            send_login_code(app.config, email, otp.code)
        except Exception:
            app.logger.exception("로그인 코드 발송 실패")
            return (
                render_template(
                    "landing.html",
                    email=email,
                    error="메일을 보내지 못했습니다. 터미널 로그에서 원인을 확인해주세요.",
                ),
                502,
            )

        session["login_email"] = email
        session["login_sent_at"] = utcnow().timestamp()
        # 개발 편의: 메일을 안 보내는 모드면 화면에도 코드를 띄운다.
        if effective_backend(app.config) != "smtp":
            session["dev_login_code"] = otp.code
        else:
            session.pop("dev_login_code", None)

        if notice:
            session["login_notice"] = notice
        return redirect(url_for("login_code"))

    @app.get("/login/code")
    def login_code():
        email = session.get("login_email")
        if not email:
            return redirect(url_for("landing"))
        return render_template(
            "auth/code.html",
            email=email,
            cooldown=cooldown_remaining("login_sent_at"),
            dev_code=session.get("dev_login_code"),
            notice=session.pop("login_notice", None),
        )

    @app.post("/login/code")
    def login_code_submit():
        email = session.get("login_email")
        if not email:
            return redirect(url_for("landing"))

        def again(error, status=400):
            return (
                render_template(
                    "auth/code.html",
                    email=email,
                    cooldown=cooldown_remaining("login_sent_at"),
                    dev_code=session.get("dev_login_code"),
                    error=error,
                ),
                status,
            )

        otp = (
            LoginOtp.query.filter_by(email=email, used_at=None)
            .order_by(LoginOtp.created_at.desc())
            .first()
        )
        if otp is None or not otp.is_usable:
            return again("코드가 만료되었거나 시도 횟수를 넘겼습니다. 코드를 다시 받아주세요.")

        code = (request.form.get("code") or "").strip()
        if code != otp.code:
            # 틀린 횟수를 세서 4자리 무차별 대입을 막는다.
            otp.attempts += 1
            db.session.commit()
            if otp.attempts_left == 0:
                return again("시도 횟수를 넘겼습니다. 코드를 다시 받아주세요.")
            return again(f"코드가 올바르지 않습니다. ({otp.attempts_left}회 남음)")

        user = User.query.filter_by(email=email).first()
        if user is None:
            # 코드 발급 후 계정이 지워진 예외 상황.
            session.pop("login_email", None)
            return redirect(url_for("landing"))

        otp.used_at = utcnow()
        db.session.commit()

        login_user(user)
        for key in ("login_email", "login_sent_at", "dev_login_code"):
            session.pop(key, None)
        return redirect(url_for("after_login"))

    @app.post("/login/resend")
    def login_resend():
        email = session.get("login_email")
        if not email:
            return redirect(url_for("landing"))

        remaining = cooldown_remaining("login_sent_at")
        if remaining:
            return (
                render_template(
                    "auth/code.html",
                    email=email,
                    cooldown=remaining,
                    dev_code=session.get("dev_login_code"),
                    error=f"{remaining}초 후에 다시 보낼 수 있어요.",
                ),
                429,
            )
        return start_login(app, email, notice="인증 코드를 다시 보냈습니다.")

    @app.get("/logout")
    @login_required
    def logout():
        logout_user()
        session.clear()
        return redirect(url_for("landing"))

    # --------------------------------------------------- 로그인 후 목적지

    @app.get("/after-login")
    @login_required
    def after_login():
        """로그인 직후 어디로 보낼지 한 곳에서 정한다.

        가입을 끝내지 않은 계정이면 멈췄던 단계로 돌려보낸다.
        """
        user = current_user
        if not user.is_signup_complete:
            return redirect(url_for("signup_plan"))
        return redirect(url_for("mypage"))

    @app.get("/mypage")
    @login_required
    def mypage():
        """로그인 후 홈. 실제 홈 화면이 생기면 이 라우트를 갈아끼우면 된다."""
        return render_template(
            "mypage.html",
            user=current_user,
            plan=PLANS.get(current_user.plan_code),
        )

    # -------------------------------------------------- 1단계: 이메일 확인

    @app.get("/signup")
    def signup_start():
        email = session.get("signup_email")
        if not email:
            return redirect(url_for("landing"))
        return render_template(
            "signup/start.html",
            step=1,
            email=email,
            marketing_opt_in=session.get("signup_marketing", False),
        )

    @app.post("/signup/send")
    def signup_send():
        """토큰을 발급하고 매직링크를 보낸다. 재전송도 이 라우트를 쓴다."""
        email = session.get("signup_email")
        if not email:
            return redirect(url_for("landing"))

        marketing = request.form.get("marketing_opt_in") is not None
        session["signup_marketing"] = marketing

        # 개인정보 수집·이용 동의는 선택이 아니라 필수다. 마케팅 수신과 달리
        # 동의 없이는 가입 자체를 진행할 수 없다.
        if request.form.get("agree_privacy") is None:
            return (
                render_template(
                    "signup/start.html",
                    step=1,
                    email=email,
                    marketing_opt_in=marketing,
                    error="개인정보 수집 및 이용에 동의해야 가입할 수 있습니다.",
                ),
                400,
            )

        remaining = cooldown_remaining()
        if remaining:
            return (
                render_template(
                    "signup/sent.html",
                    step=1,
                    email=email,
                    marketing_opt_in=marketing,
                    cooldown=remaining,
                    dev_link=dev_link(app.config),
                    error=f"{remaining}초 후에 다시 보낼 수 있어요.",
                ),
                429,
            )

        req = SignupRequest.issue(email, marketing)
        db.session.add(req)
        db.session.commit()

        # 토큰을 하나 늘렸으니 오래된 것들을 치울 기회다(간격 제한이 걸려 있다).
        maybe_purge_tokens(app)

        link = url_for("signup_verify", token=req.token, _external=True)
        try:
            send_magic_link(app.config, email, link)
        except Exception:
            # SMTP 설정이 틀렸을 때 500 대신 이유를 보여준다.
            # 발급된 토큰은 그냥 15분 뒤 만료되게 둔다.
            app.logger.exception("매직링크 발송 실패")
            return (
                render_template(
                    "signup/start.html",
                    step=1,
                    email=email,
                    marketing_opt_in=marketing,
                    error="메일을 보내지 못했습니다. 터미널 로그에서 원인을 확인해주세요.",
                ),
                502,
            )

        session["signup_sent_at"] = utcnow().timestamp()
        if effective_backend(app.config) != "smtp":
            # 개발 편의: 메일을 안 보내니 화면에도 링크를 띄워준다.
            session["dev_magic_link"] = link
        else:
            # 실제로 메일을 보냈다면 화면에 링크를 노출하면 안 된다.
            # (console 모드로 테스트하던 세션에 값이 남아 있을 수 있다)
            session.pop("dev_magic_link", None)

        # POST 후 리다이렉트 — 새로고침으로 메일이 다시 나가지 않게.
        return redirect(url_for("signup_sent"))

    @app.get("/signup/sent")
    def signup_sent():
        email = session.get("signup_email")
        if not email:
            return redirect(url_for("landing"))
        return render_template(
            "signup/sent.html",
            step=1,
            email=email,
            marketing_opt_in=session.get("signup_marketing", False),
            cooldown=cooldown_remaining(),
            dev_link=dev_link(app.config),
        )

    # ------------------------------------------------------- 매직링크 검증

    @app.get("/signup/verify")
    def signup_verify():
        """매직링크 토큰을 검증하고 계정을 만든 뒤 로그인시킨다.

        가입 토큰은 이 라우트만 소비한다. 로그인은 매직링크가 아니라 4자리
        코드를 쓰기 때문에 여기로 오지 않는다(login_code_submit 참고).
        """
        token = request.args.get("token", "")
        req = SignupRequest.query.filter_by(token=token).first()

        if req is None:
            return render_template("signup/error.html", reason="invalid"), 400
        if req.is_expired:
            return (
                render_template("signup/error.html", reason="expired", email=req.email),
                400,
            )

        # 1회용 보장. 조건부 UPDATE 라서 링크를 동시에 두 번 눌러도 하나만 통과한다.
        consumed = (
            db.session.query(SignupRequest)
            .filter(SignupRequest.id == req.id, SignupRequest.used_at.is_(None))
            .update({"used_at": utcnow()}, synchronize_session=False)
        )
        db.session.commit()
        if not consumed:
            return (
                render_template("signup/error.html", reason="used", email=req.email),
                400,
            )

        # 여기서 계정을 먼저 만든다. 2·3단계를 세션으로 진행할 수 있고,
        # 중간에 이탈해도 이어서 할 수 있다.
        user = User.query.filter_by(email=req.email).first()
        if user is None:
            user = User(email=req.email, marketing_opt_in=req.marketing_opt_in)
            db.session.add(user)
        else:
            user.marketing_opt_in = req.marketing_opt_in
        db.session.commit()

        # 이메일 소유를 확인했으니 곧바로 로그인시킨다.
        # 이후 2·3단계는 로그인된 상태로 진행되고, 중간에 이탈해도
        # 다음에 코드로 로그인하면 멈췄던 단계로 돌아온다(after_login 참고).
        login_user(user)

        for key in ("dev_magic_link", "signup_sent_at", "signup_email"):
            session.pop(key, None)
        return redirect(url_for("signup_plan"))

    # --------------------------------------------------- 2단계: 멤버십 선택

    @app.get("/signup/plan")
    @login_required
    def signup_plan():
        user = current_user
        if user.is_signup_complete:
            return redirect(url_for("signup_done"))
        return render_template(
            "signup/plan.html", step=2, plans=ordered_plans(), selected=user.plan_code
        )

    @app.post("/signup/plan")
    @login_required
    def signup_plan_submit():
        user = current_user
        code = request.form.get("plan_code")
        if code not in PLANS:
            return (
                render_template(
                    "signup/plan.html",
                    step=2,
                    plans=ordered_plans(),
                    selected=user.plan_code,
                    error="멤버십을 선택해주세요.",
                ),
                400,
            )

        user.plan_code = code
        if PLANS[code]["paid"]:
            # 결제까지 마쳐야 가입 완료 → signup_completed_at 은 아직 비워둔다.
            db.session.commit()
            return redirect(url_for("signup_payment"))

        user.signup_completed_at = utcnow()
        db.session.commit()
        return redirect(url_for("signup_done"))

    # ------------------------------------------------------- 3단계: 결제

    @app.get("/signup/payment")
    @login_required
    def signup_payment():
        user = current_user
        if user.plan_code is None or not PLANS[user.plan_code]["paid"]:
            return redirect(url_for("signup_plan"))
        return render_template(
            "signup/payment.html",
            step=3,
            plan=PLANS[user.plan_code],
            plan_code=user.plan_code,
        )

    # --------------------------------------------------------- 가입 완료

    @app.get("/signup/done")
    @login_required
    def signup_done():
        user = current_user
        if user.plan_code is None:
            return redirect(url_for("signup_plan"))
        if not user.is_signup_complete:
            # 유료 플랜을 고르고 결제를 안 끝낸 상태. 완료 화면을 보여주면 안 된다.
            return redirect(url_for("signup_payment"))
        return render_template(
            "signup/done.html", user=user, plan=PLANS[user.plan_code]
        )

    # ------------------------------------------------------------ 필터

    @app.template_filter("won")
    def won(value):
        return f"{value:,}원"

    # -------------------------------------------------------- CLI 명령

    @app.cli.command("purge-tokens")
    @click.option(
        "--hours",
        default=int(TOKEN_RETENTION.total_seconds() // 3600),
        show_default=True,
        help="죽은 지 이 시간이 지난 토큰만 지운다. 0 이면 죽은 토큰을 전부 지운다.",
    )
    @click.option("--dry-run", is_flag=True, help="지우지 않고 대상 건수만 센다.")
    def purge_tokens_command(hours, dry_run):
        """만료·사용된 토큰을 정리한다.

        평소엔 토큰 발급 때 자동으로 돌지만, 한 번에 밀거나 cron 에 걸고
        싶을 때 이 명령을 쓴다.

            flask --app app purge-tokens --dry-run
            flask --app app purge-tokens --hours 0
        """
        counts = purge_expired_tokens(
            retention=timedelta(hours=hours), dry_run=dry_run
        )
        verb = "대상" if dry_run else "삭제"
        for table, n in counts.items():
            click.echo(f"  {table:18} {n}건 {verb}")
        total = sum(counts.values())
        click.echo(
            f"총 {total}건 {verb}"
            + (" (실제로는 지우지 않았습니다)" if dry_run else "")
        )


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
