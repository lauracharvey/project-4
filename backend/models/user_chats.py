from app import db 

user_chats_join = db.Table('user_chats',
  db.Column('chats_id', db.Integer, db.ForeignKey('chats.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
)