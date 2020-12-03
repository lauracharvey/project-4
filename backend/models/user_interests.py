from app import db

user_interests_join = db.Table('user_interests',
  db.Column('interest_id', db.Integer, db.ForeignKey('interests.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)