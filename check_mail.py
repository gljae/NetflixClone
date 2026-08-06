"""SMTP 설정이 맞는지만 확인하는 스크립트.

회원가입 플로우를 다 거치지 않고 메일 발송만 따로 테스트한다.

    .venv\\Scripts\\python.exe check_mail.py 받는사람@example.com
"""

import sys

from dotenv import load_dotenv

load_dotenv()

import os  # noqa: E402  — load_dotenv 이후에 읽어야 한다

from mailer import effective_backend, send_magic_link  # noqa: E402


def main():
    if len(sys.argv) < 2:
        print("사용법: python check_mail.py 받는사람@example.com")
        return 1

    to_email = sys.argv[1]
    config = {
        "MAIL_BACKEND": os.environ.get("MAIL_BACKEND", "console"),
        "MAIL_SENDER": os.environ.get("MAIL_SENDER", "no-reply@netflix.local"),
        "SMTP_HOST": os.environ.get("SMTP_HOST", "localhost"),
        "SMTP_PORT": int(os.environ.get("SMTP_PORT", 587)),
        "SMTP_USER": os.environ.get("SMTP_USER", ""),
        "SMTP_PASSWORD": os.environ.get("SMTP_PASSWORD", ""),
    }

    print(f"MAIL_BACKEND = {config['MAIL_BACKEND']}")
    print(f"SMTP_HOST    = {config['SMTP_HOST']}:{config['SMTP_PORT']}")
    print(f"SMTP_USER    = {config['SMTP_USER'] or '(비어 있음)'}")
    print(f"SMTP_PASSWORD= {'설정됨' if config['SMTP_PASSWORD'] else '(비어 있음)'}")
    print()

    if effective_backend(config) != "smtp":
        if config["MAIL_BACKEND"] == "smtp":
            print("SMTP_PASSWORD 가 비어 있어 실제 발송을 건너뜁니다.")
            print(".env 의 SMTP_PASSWORD 에 Gmail 앱 비밀번호 16자리를 넣으세요.\n")
        else:
            print("MAIL_BACKEND 가 smtp 가 아니라 실제 발송은 하지 않습니다.")
            print(".env 에서 MAIL_BACKEND=smtp 로 바꾸세요.\n")

    try:
        send_magic_link(config, to_email, "http://localhost:5000/signup/verify?token=TEST")
    except Exception as exc:
        print(f"\n실패: {type(exc).__name__}: {exc}")
        print("\n자주 나오는 원인")
        print("  535 / Username and Password not accepted")
        print("    → Gmail 로그인 비밀번호를 넣었을 가능성이 큽니다.")
        print("      https://myaccount.google.com/apppasswords 에서 '앱 비밀번호'를")
        print("      발급받아 SMTP_PASSWORD 에 넣으세요(공백 없이 16자).")
        print("  타임아웃 / 연결 거부")
        print("    → 방화벽이나 회사 네트워크가 587 포트를 막았을 수 있습니다.")
        return 1

    if effective_backend(config) != "smtp":
        print("\n위 링크를 콘솔에 출력했을 뿐, 메일은 나가지 않았습니다.")
        return 1

    print(f"\n성공: {to_email} 로 보냈습니다. 메일함(및 스팸함)을 확인하세요.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
