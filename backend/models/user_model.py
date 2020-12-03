from app import db, bcrypt
from models.base_model import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import *
import jwt
from environment.config import secret

class User(db.Model, BaseModel):
  __tablename__ = 'users'

  first_name = db.Column(db.String(50), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  bio = db.Column(db.String(128), nullable=True)
  password_hash = db.Column(db.String(128), nullable=True)
  location = db.Column(db.String(30), nullable=False)
  age = db.Column(db.Integer, nullable=False)
  # ! Interests
  # ! Images
  # ! Socials
  # ! Matches
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