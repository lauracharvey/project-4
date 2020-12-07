from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.chat_model import Chats

class ChatsSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
  class Meta:
    model = Chats
    load_instance = True