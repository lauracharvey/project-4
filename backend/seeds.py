from app import app, db
from models.user_model import User
from models.interests_model import Interests

with app.app_context():
  print('🌱 🌱 🌱')
  db.drop_all()
  db.create_all()
  
  coding = Interests(
    name='Coding'
  )
  coding.save()
    
  print('🕺 🕺 🕺')

  harry = User(
    first_name='Harry',
    email='harry@harry.com',
    password='harry',
    bio='Hi, please can someone spoon me?',
    location='CT1',
    age='22',
    interests=[coding]
  )
  harry.save()

  print('🥸  🥸  🥸')

  