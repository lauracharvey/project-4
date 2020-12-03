from flask import Blueprint, request
from models.user_model import User
from serializers.user_schema import UserSchema

user_schema = UserSchema()

router = Blueprint(__name__, 'users')

@router.route('/signup', methods=['POST'])
def signup():
  user = user_schema.load(request.get_json())
  user.save()
  return user_schema.jsonify(user), 200

@router.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()

  if not user:
    return { 'message': 'No user found' }, 200

  if not user.validate_password(data['password']):
    return { 'message': 'Unauthorized' }, 402
  
  token = user.generate_token()

  return { 'message': 'Welcome back!',  'token': token }