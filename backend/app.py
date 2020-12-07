from flask import Flask

from environment.config import db_URI

from flask_sqlalchemy import SQLAlchemy

from flask_marshmallow import Marshmallow

from flask_bcrypt import Bcrypt

from flask_socketio import SocketIO, send

app = Flask(__name__)

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
app.register_blueprint(chat_cont.router)

if __name__ == '__main__':
    sio.run(app)