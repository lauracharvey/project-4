from flask import Blueprint, request
from models.user_model import User
from serializers.user_schema import UserSchema
from serializers.interests_schema import InterestsSchema
from models.interests_model import Interests

user_schema = UserSchema()
interests_schema = InterestsSchema()

router = Blueprint(__name__, 'interests')

@router.route('/users/<int:user_id>/interests', methods=['POST'])
def create_interests(user_id):
  interest_data = request.get_json()
  user = User.query.get(user_id)
  interest = interests_schema.load(interest_data)
  interest.user = user
  interest.save()
  return interests_schema.jsonify(interest, many=True), 200



@router.route('/interests', methods=['GET'])
def interests_index():
  interests = Interests.query.all()
  
  return interests_schema.jsonify(interests, many=True), 200