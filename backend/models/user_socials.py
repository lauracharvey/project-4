from app import db

user_socials_join = db.Table('user_socials',
  db.Column('socials_id', db.Integer, db.ForeignKey('socials.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)