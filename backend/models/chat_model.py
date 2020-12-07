from app import db

from models.base_model import BaseModel
from sqlalchemy.ext.mutable import Mutable
from sqlalchemy.dialects.postgresql import ARRAY


class MutableList(Mutable, list):
    def append(self, value):
        list.append(self, value)
        self.changed()

    @classmethod
    def coerce(cls, key, value):
        if not isinstance(value, MutableList):
            if isinstance(value, list):
                return MutableList(value)
            return Mutable.coerce(key, value)
        else:
            return value

class Chats(db.Model, BaseModel):

  __tablename__ = 'chats'

  id = db.Column(db.Integer, primary_key=True)
  user1 = db.Column(db.Integer, nullable=False)
  user2 = db.Column(db.Integer, nullable=False)
  chat_history = db.Column(MutableList.as_mutable(db.ARRAY(db.String)), nullable=True)