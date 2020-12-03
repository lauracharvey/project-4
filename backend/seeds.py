from app import app, db
from models.user_model import User

with app.app_context():
  db.drop_all()
  db.create_all()

  harry = User(
    first_name='Harry',
    email='harry@harry.com',
    password='harry',
    bio='Hi, please can someone spoon me?',
    location='CT1',
    age='22'
  )

  harry.save()