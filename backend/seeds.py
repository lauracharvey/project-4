from app import app, db
from models.user_model import User
from models.interests_model import Interests
from models.socials_model import Socials
from models.images_model import Images
from models.matches_model import Matches

with app.app_context():
  print('🌱 🌱 🌱')
  db.drop_all()
  db.create_all()
  
  spooning = Interests(
    name='Spooning'
  )

  tennis = Interests(
    name='Tennis'
  )

  football = Interests(
    name='Football'
  )
  spooning.save()
  tennis.save()
  football.save()
  print('🕺 🕺 🕺')

  harry_socials = Socials(
    Instagram='https://www.instagram.com/harrytxdd/'
  )

  laura_socials = Socials(
    Instagram='https://www.instagram.com/'
  )

  lee_socials = Socials(
    Instagram='https://www.instagram.com/'
  )
  print('🤳 🤳 🤳')

  harry_images = Images(
    image1='https://res.cloudinary.com/spoondr/image/upload/v1606992150/another_harry_qityxz.jpg'
  )
  laura_images = Images(
    image1='https://res.cloudinary.com/spoondr/image/upload/v1607339132/husky_puppy_vbsiyi.jpg'
  )

  lee_images = Images(
    image1='https://res.cloudinary.com/spoondr/image/upload/v1607339132/husky_puppy_vbsiyi.jpg'
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
    images=[harry_images],
    chats=[]
  )
  harry.save()

  harry_match = Matches(
    Liked=[harry.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  harry.matches.append(harry_match)
  harry.save()

  laura = User(
    first_name='Laura',
    email='laura@laura.com',
    password='laura',
    bio='Spoon dogs not humans',
    location='ME14',
    age='21',
    socials=[laura_socials],
    images=[laura_images],
    chats=[]
  )
  laura.save()

  laura_match = Matches(
    Liked=[laura.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  laura.matches.append(laura_match)
  laura.save()

  lee = User(
    first_name='Lee',
    email='lee@lee.com',
    password='lee',
    bio='PUT THE PHONE BACK',
    location='PE19',
    age='23',
    socials=[lee_socials],
    images=[lee_images],
    chats=[]
  )
  lee.save()

  lee_match = Matches(
    Liked=[lee.id],
    LikedBy=[harry.id],
    Matched=[],
    Disliked=[]
  )

  lee.matches.append(lee_match)
  lee.save()


  print('🥸  🥸  🥸')



  