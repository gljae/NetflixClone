"""매직링크 메일 발송.

개발 중에는 SMTP 를 붙이지 않고 콘솔에 링크를 찍는다(MAIL_BACKEND=console).
실제로 메일을 보내려면 MAIL_BACKEND=smtp 와 SMTP_* 환경변수를 채우면 된다.
"""

import smtplib
import sys
from email.message import EmailMessage
from email.utils import formataddr

# 윈도우 콘솔은 기본 인코딩이 cp949 라서 한글이 깨진다.
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")

#: SMTP 접속 때 보내는 "EHLO <호스트명>" 의 호스트명.
#: 지정하지 않으면 PC 이름을 그대로 쓰는데, 이름에 한글이 섞여 있으면
#: smtplib 이 ASCII 로 인코딩하다 UnicodeEncodeError 로 죽는다.
EHLO_HOSTNAME = "localhost"

#: 응답이 없을 때 무한정 매달리지 않도록.
SMTP_TIMEOUT = 15


def _build_message(to_email, link, sender):
    msg = EmailMessage()
    msg["Subject"] = "[NETFLIX] 계정 등록을 완료해 주세요"
    msg["From"] = formataddr(("NETFLIX", sender))
    msg["To"] = to_email
    msg.set_content(
        "아래 링크를 눌러 계정 등록을 이어가세요. 링크는 15분간 유효합니다.\n\n"
        f"{link}\n\n"
        "본인이 요청하지 않았다면 이 메일은 무시하셔도 됩니다."
    )
    msg.add_alternative(
        f"""\
<div style="max-width:480px;margin:0 auto;font-family:'Malgun Gothic',sans-serif;color:#000">
  <p style="color:#e50914;font-size:26px;font-weight:800;letter-spacing:1px;margin:0 0 28px">NETFLIX</p>
  <h1 style="font-size:22px;margin:0 0 12px">계정 등록이 한 단계 남았습니다</h1>
  <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 28px">
    아래 버튼을 누르면 멤버십 선택 화면으로 이동합니다.<br>링크는 <strong>15분간</strong> 유효합니다.
  </p>
  <a href="{link}"
     style="display:inline-block;background:#e50914;color:#fff;text-decoration:none;
            font-size:16px;font-weight:700;padding:14px 32px;border-radius:4px">계정 등록</a>
  <p style="font-size:12px;line-height:1.6;color:#777;margin:32px 0 0">
    본인이 요청하지 않았다면 이 메일은 무시하셔도 됩니다.
  </p>
</div>""",
        subtype="html",
    )
    return msg


def effective_backend(config):
    """실제로 쓸 백엔드.

    MAIL_BACKEND=smtp 인데 SMTP_PASSWORD 가 비어 있으면 로그인에서 터진다.
    그럴 땐 console 로 떨어뜨려서, 비밀번호를 채우기 전에도 가입 플로우를
    계속 테스트할 수 있게 한다.
    """
    if config["MAIL_BACKEND"] == "smtp" and not config["SMTP_PASSWORD"]:
        return "console"
    return config["MAIL_BACKEND"]


def send_magic_link(config, to_email, link):
    """매직링크를 보낸다. console 백엔드면 터미널에 출력만 한다."""
    backend = effective_backend(config)

    if backend != config["MAIL_BACKEND"]:
        print(
            "  ! MAIL_BACKEND=smtp 인데 SMTP_PASSWORD 가 비어 있어 "
            "메일을 보내지 않고 링크만 출력합니다. (.env 확인)",
            flush=True,
        )

    if backend != "smtp":
        print("\n" + "=" * 68)
        print(f"  [매직링크] {to_email}")
        print(f"  {link}")
        print("=" * 68 + "\n", flush=True)
        return

    msg = _build_message(to_email, link, config["MAIL_SENDER"])
    with smtplib.SMTP(
        config["SMTP_HOST"],
        config["SMTP_PORT"],
        local_hostname=EHLO_HOSTNAME,
        timeout=SMTP_TIMEOUT,
    ) as smtp:
        smtp.starttls()
        if config["SMTP_USER"]:
            smtp.login(config["SMTP_USER"], config["SMTP_PASSWORD"])
        smtp.send_message(msg)
