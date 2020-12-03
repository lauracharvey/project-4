from app import db

from models.base_model import BaseModel

class Images(db.Model, BaseModel):

  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  image1 = db.Column(db.String(200), nullable=True)
  image2 = db.Column(db.String(200), nullable=True)
  image3 = db.Column(db.String(200), nullable=True)
  image4 = db.Column(db.String(200), nullable=True)
  image5 = db.Column(db.String(200), nullable=True)