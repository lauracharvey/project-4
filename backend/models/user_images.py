from app import db

user_images_join = db.Table('user_images',
  db.Column('images_id', db.Integer, db.ForeignKey('images.id'), primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)