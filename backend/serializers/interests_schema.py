from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.interests_model import Interests

class InterestsSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Interests
    load_instance = True