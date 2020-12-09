import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'


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

  return <main className="maining">
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
    <label>Name:
      <p>{user.first_name}</p>
    </label>
    <label>Age:
      <p>{user.age}</p>
    </label>
    <label>Gender:
      <p>{user.gender}</p>
    </label>
    <label>Bio:
      <p>{user.bio}</p>
    </label>
    <label>Location:
      <p>{user.location}</p>
    </label>
    {user.interests[0] && <label>Interests:
      {user.interests.map((int, ind) => {
        return <p key={ind}>{int.name}</p>
      })}
    </label>}
    {user.socials[0].Instagram && <label>Instagram:
      <a>{user.socials[0].Instagram}</a>      
    </label>}

    {user.socials[0].Facebook && <label>Facebook:
      <a>{user.socials[0].Facebook}</a>      
    </label>}

    {user.socials[0].Spotify && <label>Spotify:
      <a>{user.socials[0].Spotify}</a>      
    </label>}

    {user.socials[0].LinkedIn && <label>LinkedIn:
      <a>{user.socials[0].LinkedIn}</a>      
    </label>}
  </main>
}

export default Profile