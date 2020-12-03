from app import db

from models.base_model import BaseModel

class Interests(db.Model, BaseModel):

  __tablename__ = 'interests'

  name = db.Column(db.String(40), unique=True, nullable=True)