from flask import Blueprint, request, g
from models.user_model import User
from serializers.populate_user_schema import PopulateUserSchema
from models.images_model import Images
from models.socials_model import Socials
from models.matches_model import Matches
from marshmallow import ValidationError

user_schema = PopulateUserSchema()

router = Blueprint(__name__, 'users')

@router.route('/signup', methods=['POST'])
def signup():
  user = user_schema.load(request.get_json())
  template_images = Images(
    image1='https://res.cloudinary.com/spoondr/image/upload/v1607006914/Portrait_Placeholder_zu9uoa.png'
  )
  template_social= Socials(
    Instagram ='https://www.instagram.com'
  )
  user.images = [template_images]
  user.socials = [template_social]
  user.save()

  template_match = Matches(
    Liked=[user.id],
    LikedBy=[],
    Matched=[]
  )
  user.matches.append(template_match)
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

@router.route('/users', methods=['GET'])
def index_users():
  users = User.query.all()
  
  return user_schema.jsonify(users, many=True), 200

@router.route('/users/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
  user = User.query.get(user_id)
  return user_schema.jsonify(user), 200

@router.route('users/<int:user_id>/update', methods=['PUT'])
def update_user(user_id):
  existing_user = User.query.get(user_id)
  
  try:
    user = user_schema.load(
      request.get_json(),
      instance=existing_user,
      partial=True
    )
  except ValidationError as e:
    return {'errors': e.messages, 'message': 'Something went wrong'}

  user.save()
  
  return user_schema.jsonify(user), 200
