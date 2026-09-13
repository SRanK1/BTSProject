
from flask import Flask, render_template
import webbrowser
from threading import Timer

app = Flask(__name__)


@app.route("/")
def inicio():
    return render_template("index.html")


def abrir_navegador():
    webbrowser.open("http://127.0.0.1:5000")


if __name__ == "__main__":
    Timer(1.5, abrir_navegador).start()

    app.run(
        debug=False,
        use_reloader=False
    )



