from app import db

user_matches_join = db.Table('user_matches',
  db.Column('matches_id', db.Integer, db.ForeignKey('matches.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)