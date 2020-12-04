from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.matches_model import Matches

class MatchesSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Matches
    load_instance = True
