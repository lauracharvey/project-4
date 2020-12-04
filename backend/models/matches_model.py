from app import db
from models.base_model import BaseModel


class Matches(db.Model, BaseModel):

  __tablename__ = 'matches'

  id = db.Column(db.Integer, primary_key=True)
  Liked = db.Column(db.ARRAY(db.Integer), nullable=True)
  LikedBy = db.Column(db.ARRAY(db.Integer), nullable=True)
  Matched = db.Column(db.ARRAY(db.Integer), nullable=True)