from app import db

from models.base_model import BaseModel

class Chats(db.Model, BaseModel):

  __tablename__ = 'chats'

  id = db.Column(db.Integer, primary_key=True)
  user1 = db.Column(db.Integer, nullable=False)
  user2 = db.Column(db.Integer, nullable=False)