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
  default_image = Images(
    image1='https://res.cloudinary.com/spoondr/image/upload/v1607006914/Portrait_Placeholder_zu9uoa.png'
  )
  print('📸 📸 📸')

  harry = User(
    first_name='Harry',
    email='harry@harry.com',
    password='harry',
    bio='Hi, please can someone spoon me?',
    location='CT1',
    age='22',
    gender='Male',
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
    gender='Female',
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
    gender='Male',
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

  alexia = User(
    first_name='Alexia',
    email='alexia@alexia.com',
    password='alexia',
    bio='Spoony Woony',
    location='CT1',
    age='21',
    gender='Female',
    interests=[spooning],
    socials=[harry_socials],
    images=[default_image],
    chats=[]
  )
  alexia.save()

  alexia_match = Matches(
    Liked=[alexia.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  alexia.matches.append(alexia_match)
  alexia.save()

  gigi = User(
    first_name='Gigi',
    email='gigi@gigi.com',
    password='gigi',
    bio='Woof',
    location='CT1',
    age='3',
    gender='Female',
    interests=[spooning],
    socials=[harry_socials],
    images=[default_image],
    chats=[]
  )
  gigi.save()

  gigi_match = Matches(
    Liked=[gigi.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  gigi.matches.append(gigi_match)
  gigi.save()

  joe = User(
    first_name='Joe',
    email='joe@joe.com',
    password='joe',
    bio='Hi',
    location='CT1',
    age='26',
    gender='Male',
    interests=[spooning],
    socials=[harry_socials],
    images=[default_image],
    chats=[]
  )
  joe.save()

  joe_match = Matches(
    Liked=[joe.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  joe.matches.append(joe_match)
  joe.save()

  jon = User(
    first_name='Jon',
    email='jon@jon.com',
    password='jon',
    bio='No one touch me',
    location='CT1',
    age='49',
    gender='Male',
    interests=[spooning],
    socials=[harry_socials],
    images=[default_image],
    chats=[]
  )
  jon.save()

  jon_match = Matches(
    Liked=[jon.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  jon.matches.append(jon_match)
  jon.save()

  megan = User(
    first_name='Megan',
    email='megan@megan.com',
    password='megan',
    bio='Yaaaaas',
    location='CT1',
    age='25',
    gender='Female',
    interests=[spooning],
    socials=[harry_socials],
    images=[default_image],
    chats=[]
  )
  megan.save()

  megan_match = Matches(
    Liked=[megan.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  megan.matches.append(megan_match)
  megan.save()

  ellie = User(
    first_name='Ellie',
    email='ellie@ellie.com',
    password='ellie',
    bio='Up for any kind of spoon',
    location='CT1',
    age='20',
    gender='Female',
    interests=[spooning],
    socials=[harry_socials],
    images=[default_image],
    chats=[]
  )
  ellie.save()

  ellie_match = Matches(
    Liked=[ellie.id],
    LikedBy=[],
    Matched=[],
    Disliked=[]
  )

  ellie.matches.append(ellie_match)
  ellie.save()

  print('🥸  🥸  🥸')