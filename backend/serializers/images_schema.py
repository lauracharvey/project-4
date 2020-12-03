from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.images_model import Images

class ImagesSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Images
    load_instance = True