from flask import Blueprint, request
from models.user_model import User
from serializers.populate_user_schema import PopulateUserSchema
from serializers.images_schema import ImagesSchema
from models.images_model import Images
from marshmallow import ValidationError

user_schema = PopulateUserSchema()
images_schema = ImagesSchema()

router = Blueprint(__name__, 'images')

@router.route('/images', methods=['GET'])
def images_index():
  images = Images.query.all()

  return images_schema.jsonify(images, many=True),200


@router.route('/users/<int:user_id>/images', methods=['PUT'])
def create_images(user_id): 
  existing_images = Images.query.get(user_id)

  try:
    image = images_schema.load(
      request.get_json(),
      instance=existing_images,
      partial=True
    )
  except ValidationError as e:
    return {'errors': e.messages, 'message': 'Something went wrong'}

  image.save()

  return images_schema.jsonify(image), 201


@router.route('/users/<int:user_id>/images', methods=['GET'])
def single_user_images(user_id):
  existing_images = Images.query.get(user_id)

  return images_schema.jsonify(existing_images), 200