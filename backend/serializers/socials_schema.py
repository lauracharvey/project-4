from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.socials_model import Socials

class SocialsSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Socials
    load_instance = True