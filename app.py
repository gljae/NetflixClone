"""넷플릭스 인트로("두둥" — N 분해) 데모 서버.

인트로 자체는 static/css/intro.css + static/js/intro.js 두 파일에 다 들어 있고
서버는 페이지를 내려주기만 한다. 합칠 때 이 파일은 필요 없다.
"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
