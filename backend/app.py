from flask import Flask
app = Flask(__name__)

# ! Hello world flask app to start you off.
@app.route('/')
def index():
    return "Hello, World!"