from flask import Blueprint, request
from app import sio
from flask_socketio import send, join_room, leave_room

router = Blueprint(__name__, 'chat')

@sio.on('message')
def handleMessage(msg):
  print(msg)
  send(msg, broadcast=True)
  return None 

@sio.on('join_room')
def handle_join_room(data):
  join_room(data['room'])
  sio.emit(data, room=data['room'])