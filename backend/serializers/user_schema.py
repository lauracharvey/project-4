from app import ma
from serializers.base_schema import BaseSchema
from marshmallow import fields, ValidationError, validates_schema
from models.user_model import User


class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  @validates_schema
  def check_passwords_match(self, data, **kwargs):
    if data.get('password') != data.get('password_confirmation'):
      raise ValidationError(
            'Passwords do not match',
            'password_confirmation'
    )
  password = fields.String(required=True)
  password_confirmation = fields.String(required=True)

  class Meta: 
    model = User
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('email', 'password')

  password = fields.String(required=True)