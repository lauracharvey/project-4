from app import app, db
from models.user_model import User
from models.interests_model import Interests
from models.socials_model import Socials
from models.images_model import Images

with app.app_context():
  print('🌱 🌱 🌱')
  db.drop_all()
  db.create_all()
  
  spooning = Interests(
    name='Spooning'
  )
  spooning.save()
  print('🕺 🕺 🕺')

  harry_socials = Socials(
    Instagram='https://www.instagram.com/harrytxdd/'
  )
  print('🤳 🤳 🤳')

  harry_images = Images(
    image1='https://res.cloudinary.com/spoondr/image/upload/v1606992150/another_harry_qityxz.jpg'
  )
  print('📸 📸 📸')

  harry = User(
    first_name='Harry',
    email='harry@harry.com',
    password='harry',
    bio='Hi, please can someone spoon me?',
    location='CT1',
    age='22',
    interests=[spooning],
    socials=[harry_socials],
    images=[harry_images]
  )
  harry.save()

  print('🥸  🥸  🥸')

  