"""넷플릭스 클론 — 매직링크 회원가입.

플로우
    /                랜딩(이메일 입력)
    POST /auth/check 이미 가입 → 안내 / 미가입 → 회원가입창
    /signup          [1단계] 이메일 확인 + 마케팅 동의 → 링크 발송
    /signup/sent     메일함 확인 안내
    /signup/verify   토큰 검증 → users 생성 → 세션 부여
    /signup/plan     [2단계] 멤버십 선택 (무료면 바로 완료)
    /signup/payment  [3단계] 결제 (아직 미구현)
    /signup/done     완료


나중에 붙일 것 — 파일 안에서 아래 표시로 찾을 수 있다
    "[로그인 연결]"  로그인 기능이 끼어들 자리
    "[두둥 연결]"    인트로 애니메이션이 끼어들 자리 (templates/ 쪽)

로그인은 이 파일의 회원가입 코드를 거의 그대로 재사용한다.
매직링크로 이메일 소유를 확인하고 세션을 주는 흐름이 완전히 같기 때문이다.
차이는 딱 두 가지다.
    - 로그인은 users 레코드를 만들지 않는다 (이미 있는 계정을 찾을 뿐)
    - 로그인은 플랜 선택 단계로 가지 않는다 (바로 홈으로)
자세한 건 auth_check() 와 signup_verify() 의 [로그인 연결] 주석 참고.
"""

import os
import re

from dotenv import load_dotenv
from flask import (
    Flask,
    redirect,
    render_template,
    request,
    session,
    url_for,
)

from mailer import effective_backend, send_magic_link
from models import SignupRequest, User, db, utcnow
from plans import PLANS, ordered_plans

#: 완벽한 검증은 불가능하다. 오타를 걸러내는 정도로만 쓰고, 진짜 확인은
#: "메일이 실제로 도착하는가" 로 한다 — 매직링크 방식의 장점이기도 하다.
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

#: 재전송 쿨다운(초). 없으면 남의 메일함에 스팸을 보내는 도구가 된다.
RESEND_COOLDOWN = 60

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
    with app.app_context():
        db.create_all()

    register_routes(app)
    return app


# ---------------------------------------------------------------- 헬퍼


def cooldown_remaining():
    """재전송까지 남은 초. 0 이면 지금 보낼 수 있다."""
    sent_at = session.get("signup_sent_at")
    if not sent_at:
        return 0
    elapsed = utcnow().timestamp() - sent_at
    return max(0, int(RESEND_COOLDOWN - elapsed))


def signup_user():
    """가입 절차를 진행 중인 사용자. 세션이 없으면 None.

    [로그인 연결]
    사실 이건 그냥 "지금 로그인된 사용자" 를 읽는 함수다. session["user_id"]
    를 심는 곳이 매직링크 검증 시점(signup_verify)이라 이름만 signup_ 이다.

    로그인을 붙일 땐 이 함수를 current_user() 로 이름만 바꿔서 같이 쓰면 된다.
    로그인용으로 따로 만들 필요가 없다.
    """
    user_id = session.get("user_id")
    return db.session.get(User, user_id) if user_id else None


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
        return render_template("landing.html")

    @app.post("/auth/check")
    def auth_check():
        """이메일이 이미 가입됐는지 보고 갈 곳을 정한다."""
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

        user = User.query.filter_by(email=email).first()
        if user and user.is_signup_complete:
            # ── [로그인 연결] ───────────────────────────────────────
            # 여기가 회원가입과 로그인이 갈라지는 지점이다.
            # 지금은 "이미 가입됨" 안내만 하고 끝낸다.
            #
            # 로그인을 붙일 땐 이 줄을 아래로 바꾸면 된다.
            #
            #     session["login_email"] = email
            #     return redirect(url_for("login_start"))
            #
            # login_start 는 signup_start 와 화면이 거의 같다.
            # ("계정 등록 링크" → "로그인 링크" 정도만 다름)
            # 마케팅 동의 체크박스는 로그인엔 필요 없으니 빼면 된다.
            # ──────────────────────────────────────────────────────
            return render_template("already_registered.html", email=email)

        # 미가입, 또는 가입하다 만 계정 → 처음부터 다시 진행한다.
        session["signup_email"] = email
        session.pop("user_id", None)
        return redirect(url_for("signup_start"))

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
        """매직링크 토큰을 검증하고 세션을 준다.

        [로그인 연결]
        이 함수의 앞부분(토큰 조회 → 만료 확인 → 조건부 UPDATE 로 1회용 소비)
        은 로그인에서도 글자 하나 안 바꾸고 그대로 쓴다. 뒷부분만 다르다.

            회원가입: 계정이 없으면 만든다 → /signup/plan 으로
            로그인  : 계정이 없으면 에러   → 홈으로

        붙일 때는 아래 둘 중 하나를 고르면 된다.

        (A) 토큰에 용도를 표시한다  ← 권장
            SignupRequest 에 purpose 컬럼("signup"/"login")을 추가하고
            이 함수에서 purpose 로 분기한다. 테이블이 하나로 유지된다.
            models.py 의 [로그인 연결] 주석 참고.

        (B) 라우트를 따로 판다
            /login/verify 를 만들고 이 함수를 복사해 뒷부분만 고친다.
            빠르지만 토큰 검증 로직이 두 벌이 된다. 나중에 한쪽만
            고치는 사고가 나기 쉽다.
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

        # [로그인 연결] 이 한 줄이 곧 "로그인" 이다.
        # 로그인 기능을 붙여도 세션에 넣는 값은 똑같다. 로그인 라우트에서도
        # 이 두 줄만 실행하고 홈으로 보내면 끝난다.
        session["user_id"] = user.id
        session["signup_email"] = user.email

        session.pop("dev_magic_link", None)
        session.pop("signup_sent_at", None)
        return redirect(url_for("signup_plan"))

    # --------------------------------------------------- 2단계: 멤버십 선택

    @app.get("/signup/plan")
    def signup_plan():
        user = signup_user()
        if user is None:
            return redirect(url_for("landing"))
        if user.is_signup_complete:
            return redirect(url_for("signup_done"))
        return render_template(
            "signup/plan.html", step=2, plans=ordered_plans(), selected=user.plan_code
        )

    @app.post("/signup/plan")
    def signup_plan_submit():
        user = signup_user()
        if user is None:
            return redirect(url_for("landing"))

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
    def signup_payment():
        user = signup_user()
        if user is None:
            return redirect(url_for("landing"))
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
    def signup_done():
        user = signup_user()
        if user is None:
            return redirect(url_for("landing"))
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


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
