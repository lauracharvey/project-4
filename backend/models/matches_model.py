from app import db
from models.base_model import BaseModel
from sqlalchemy.ext.mutable import Mutable
from sqlalchemy.dialects.postgresql import ARRAY

class MutableList(Mutable, list):
    def append(self, value):
        list.append(self, value)
        self.changed()
    
    def remove(self, value):
      list.remove(self, value)
      self.changed()

    @classmethod
    def coerce(cls, key, value):
        if not isinstance(value, MutableList):
            if isinstance(value, list):
                return MutableList(value)
            return Mutable.coerce(key, value)
        else:
            return value

class Matches(db.Model, BaseModel):

  __tablename__ = 'matches'

  id = db.Column(db.Integer, primary_key=True)
  Liked = db.Column(MutableList.as_mutable(db.ARRAY(db.Integer)), nullable=True)
  LikedBy = db.Column(MutableList.as_mutable(db.ARRAY(db.Integer)), nullable=True)
  Matched = db.Column(MutableList.as_mutable(db.ARRAY(db.Integer)), nullable=True)
  Disliked = db.Column(MutableList.as_mutable(db.ARRAY(db.Integer)), nullable=True)