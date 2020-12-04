from flask import Blueprint, request
from models.user_model import User
from serializers.populate_user_schema import PopulateUserSchema
from serializers.socials_schema import SocialsSchema
from models.socials_model import Socials
from marshmallow import ValidationError

user_schema = PopulateUserSchema()
socials_schema = SocialsSchema()

router = Blueprint(__name__, 'interests')

@router.route('/socials', methods=['GET'])
def socials_index():
  social = Socials.query.all()

  return socials_schema.jsonify(social, many=True),200

@router.route('/users/<int:user_id>/socials', methods=['PUT'])
def create_socials(user_id): 
  existing_socials = Socials.query.get(user_id)
  try:
    social = socials_schema.load(
      request.get_json(),
      instance=existing_socials,
      partial=True
    )
  except ValidationError as e:
    return {'errors': e.messages, 'message': 'Something went wrong'}
  social.save()
  return socials_schema.jsonify(social), 200


@router.route('/users/<int:user_id>/socials', methods=['GET'])
def single_user_socials(user_id):
  existing_socials = Socials.query.get(user_id)

  return socials_schema.jsonify(existing_socials), 200