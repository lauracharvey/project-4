from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields
from models.user_model import User
from serializers.user_schema import UserSchema
from serializers.socials_schema import SocialsSchema
from serializers.images_schema import ImagesSchema
from serializers.matches_schema import MatchesSchema

class PopulateUserSchema(UserSchema):

  interests = fields.Nested('InterestsSchema', many=True)
  socials = fields.Nested('SocialsSchema', many=True)
  images = fields.Nested('ImagesSchema', many=True)
  matches = fields.Nested('MatchesSchema', many=True)


