from flask import Blueprint, request
from models.user_model import User
from serializers.populate_user_schema import PopulateUserSchema
from models.matches_model import Matches
from serializers.matches_schema import MatchesSchema

user_schema = PopulateUserSchema()
matches_schema = MatchesSchema()

@router.route('/users/<int:user_id>/like', methods=['PUT'])