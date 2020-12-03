from app import db

from models.base_model import BaseModel

class Socials(db.Model, BaseModel):

  __tablename__ = 'socials'

  Instagram = db.Column(db.String(128), unique=True, nullable=True)
  Facebook = db.Column(db.String(128), unique=True, nullable=True)
  LinkedIn = db.Column(db.String(128), unique=True, nullable=True)
  Spotify = db.Column(db.String(128), unique=True, nullable=True)