from app import db, bcrypt
from models.base_model import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from models.interests_model import Interests
from models.socials_model import Socials
from models.images_model import Images
from models.matches_model import Matches
from models.chat_model import Chat
from models.user_interests import user_interests_join
from models.user_socials import user_socials_join
from models.user_images import user_images_join
from models.user_matches import user_matches_join
from models.user_chats import user_chats_join
from datetime import *
import jwt
from environment.config import secret

class User(db.Model, BaseModel):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(50), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  bio = db.Column(db.String(128), nullable=True)
  password_hash = db.Column(db.String(128), nullable=True)
  location = db.Column(db.String(30), nullable=False)
  age = db.Column(db.Integer, nullable=False)
  interests = db.relationship('Interests', secondary=user_interests_join, backref='users')
  socials = db.relationship('Socials', secondary=user_socials_join, backref='users')
  images = db.relationship('Images', secondary=user_images_join, backref='users')
  matches = db.relationship('Matches', secondary=user_matches_join, backref='users')
  chats = db.relationship('Chats', secondary=user_chats_join, backref='users')
  # ! Report

  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)

  def generate_token(self):
    payload = { 
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }
    token = jwt.encode(payload, secret, 'HS256').decode('utf-8')

    return token