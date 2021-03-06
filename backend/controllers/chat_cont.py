from flask import Blueprint, request
from app import sio
from flask_socketio import send, join_room, leave_room
from models.chat_model import Chats
from serializers.chats_schema import ChatsSchema
from marshmallow import ValidationError

chats_schema = ChatsSchema()

router = Blueprint(__name__, 'chat')

@sio.on('send_message')
def handleMessage(data):
  print(data)
  sio.emit('receive_message', data, room=data['room'])
  return None 

@sio.on('join_room')
def handle_join_room(data):
  join_room(data['room'])
  sio.emit(data, room=data['room'])

@router.route('/chat/<int:chat_id>', methods=['GET'])
def get_chat(chat_id):
  chat_record = Chats.query.get(chat_id)

  print(chat_record.chat_history)

  return chats_schema.jsonify(chat_record)

@router.route('/chat/<int:chat_id>', methods=['PUT'])
def update_chat(chat_id):
  exsisting_chat = Chats.query.get(chat_id)

  try:
    chat = chats_schema.load(
      request.get_json(),
      instance=exsisting_chat,
      partial=True
    )
  
  except ValidationError as e:
    return {'errors': e.messages, 'message': 'Something went wrong'}
  
  chat.save()

  return chats_schema.jsonify(chat)

  