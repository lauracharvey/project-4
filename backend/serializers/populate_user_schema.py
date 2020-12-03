from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.user_model import User
from serializers.user_schema import UserSchema

class PopulateUserSchema(UserSchema):

  interests = fields.Nested('InterestsSchema', many=True)



