from app import db

from models.base_model import BaseModel

class Images(db.Model, BaseModel):

  __tablename__ = 'images'

  image1 = db.Column(db.String(200), unique=True, nullable=True)
  image2 = db.Column(db.String(200), unique=True, nullable=True)
  image3 = db.Column(db.String(200), unique=True, nullable=True)
  image4 = db.Column(db.String(200), unique=True, nullable=True)
  image5 = db.Column(db.String(200), unique=True, nullable=True)