from app import app, db
from models.user_model import User

with app.app_context():
  harry = User(
    first_name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    bio = db.Column(db.String(128), nullable=True)
    location
    age
    images
    socials
  )