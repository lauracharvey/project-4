import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Header from './Header'
import Footer from './Navbar'


const Profile = (props) => {
  const userID = props.match.params.userID
  const [user, updateUser] = useState({})
  const [slideImages, updateSlideImages] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${userID}`)
      .then(res => {
        const resData = res.data
        updateUser(resData)
        console.log(resData)

        let images = []
        Object.keys(resData.images[0]).map((key) => {
          if (key.includes('image') && resData.images[0][key] !== null) {
            images.push(resData.images[0][key])
            const newImages = [...images]
            updateSlideImages(newImages)
          }
        })
      })
  }, [])

  if (!slideImages[0]) {
    return <h1>LOADING</h1>
  }

  return <main className="userProfileMain">
    <Header />
    <div>
      <div className="slide-container">
      <Slide autoplay={false} infinite={false}>
        {slideImages.map((image, ind) => {
          return <div key={ind} className="each-slide">
            <div style={{ backgroundImage: `url(${image})`, height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center' }} >
            </div>
          </div>
        })}
      </Slide>
    </div>
    </div>
    
    <div className="userInfo">
      <h2>{user.first_name}, {user.age}</h2>
      <hr></hr>
      <p className="bio">{user.bio}</p>
      <hr></hr>
      <p>Location: {user.location}</p>
      <hr></hr>
      {user.interests[0] && <label>Interests:
      {user.interests.map((int, ind) => {
        return <p className="interest" key={ind}>{int.name}</p>
      })}
      </label>}

      <h3>
        Check out {user.first_name} on Social Media
      </h3>

      <div className="socialsContainer">
        <a href={user.socials[0].Instagram}>
          <img src={'https://www.flaticon.com/svg/static/icons/svg/2111/2111463.svg'} />
        </a>

        <a href={user.socials[0].Facebook}>
          <img src={'https://www.flaticon.com/svg/static/icons/svg/733/733547.svg'} />
        </a>

        <a href={user.socials[0].Spotify}>
          <img src={'https://www.flaticon.com/svg/static/icons/svg/2111/2111624.svg'} />
        </a>

        <a href={user.socials[0].LinkedIn}>
          <img src={'https://www.flaticon.com/svg/static/icons/svg/174/174857.svg'} />
        </a>
      </div>
    </div>
    <Footer />
  </main>
}

export default Profile