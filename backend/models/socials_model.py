from app import db

from models.base_model import BaseModel

class Socials(db.Model, BaseModel):

  __tablename__ = 'socials'

  id = db.Column(db.Integer, primary_key=True)
  Instagram = db.Column(db.String(128), nullable=True)
  Facebook = db.Column(db.String(128), nullable=True)
  LinkedIn = db.Column(db.String(128), nullable=True)
  Spotify = db.Column(db.String(128), nullable=True)