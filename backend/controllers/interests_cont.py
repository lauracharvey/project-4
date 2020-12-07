from flask import Blueprint, request
from models.user_model import User
from serializers.populate_user_schema import PopulateUserSchema
from serializers.interests_schema import InterestsSchema
from models.interests_model import Interests

user_schema = PopulateUserSchema()
interests_schema = InterestsSchema()

router = Blueprint(__name__, 'interests')

@router.route('/users/<int:user_id>/interests', methods=['PUT'])
def create_interests(user_id):
  interest_data = request.get_json()
  user = User.query.get(user_id)
  interest = interests_schema.load(interest_data)
  user.interests.append(interest)
  user.save()
  return interests_schema.jsonify(interest), 200


@router.route('/interests', methods=['GET'])
def interests_index():
  interests = Interests.query.all()
  
  return interests_schema.jsonify(interests, many=True), 200

@router.route('/interests/<int:user_id>', methods=['GET'])
def interests_not_users(user_id):
  user = User.query.get(user_id)
  user_interests = user.interests
  user_int_ids = set()
  for int in user_interests:
    user_int_ids.add(int.id)

  all_interests = Interests.query.all()
  all_int_ids = set()
  for int in all_interests:
    all_int_ids.add(int.id)

  unused_int = all_int_ids - user_int_ids

  interests = []
  for id in unused_int:
    interest = Interests.query.get(id)
    interests.append(interest)

  return interests_schema.jsonify(interests, many=True), 200
