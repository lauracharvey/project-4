from flask import Flask

from environment.config import db_URI

from flask_sqlalchemy import SQLAlchemy

from flask_marshmallow import Marshmallow

from flask_bcrypt import Bcrypt

from flask_socketio import SocketIO, send

app = Flask(__name__, static_folder='dist')

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

sio = SocketIO(app, cors_allowed_origins="*")

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import user_cont, interests_cont, images_cont, socials_cont, matches_cont, chat_cont

app.register_blueprint(user_cont.router, url_prefix="/api")
app.register_blueprint(interests_cont.router, url_prefix="/api")
app.register_blueprint(images_cont.router, url_prefix="/api")
app.register_blueprint(socials_cont.router, url_prefix="/api")
app.register_blueprint(matches_cont.router, url_prefix="/api")
app.register_blueprint(chat_cont.router, url_prefix="/api")

import os

@app.route('/', defaults={'path': ''}) # homepage
@app.route('/<path:path>') # any other path
def catch_all(path):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'dist/' + path)

    if os.path.isfile(filename): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html') # otherwise send back the index.html file

if __name__ == '__main__':
    sio.run(app)