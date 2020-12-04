from flask import Blueprint, request, g
from models.user_model import User
from serializers.populate_user_schema import PopulateUserSchema
from models.matches_model import Matches
from serializers.matches_schema import MatchesSchema
from middleware.secure_route import secure_route

user_schema = PopulateUserSchema()
matches_schema = MatchesSchema()

router = Blueprint(__name__, 'matches')

@router.route('/users/<int:user_id>/like', methods=['PUT'])
@secure_route
def like_user(user_id):
  liked_user = User.query.get(user_id)
  existing_matches = Matches.query.get(user_id)
  existing_curr_matches = Matches.query.get(g.current_user.id)
  
  likedby = existing_matches.LikedBy.append(g.current_user.id)
  like = existing_curr_matches.Liked.append(user_id)

  matches_schema.load(likedby)
  matches_schema.load(like)

  existing_matches.save()
  existing_curr_matches.save()

  # liked_user.save()
  # g.current_user.save()

  return user_schema.jsonify(liked_user), 200