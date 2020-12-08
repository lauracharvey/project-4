import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Carousel } from 'react-responsive-carousel'


const Profile = (props) => {
  const userID = props.match.params.userID

  const [user, updateUser] = useState({})
  let userImages = []

  useEffect(() => {
    axios.get(`/api/users/${userID}`)
      .then(res => {
        const resData = res.data
        updateUser(resData)
        userImages = Object.keys(resData.images[0]).map((key) => {
          if (key.includes('image') && resData.images[0][key] !== null) {
            userImages.push(resData.images[0][key])
            console.log(userImages)
          }
        })
      })
  }, [])

  if (!user.age) {
    return <h1>LOADING</h1>
  }

  return <main>
    <Carousel showArrows={true} swipeable={true} emulateTouch={true} showIndicators={true} infiniteLoop={true}>
      {userImages.map((image, ind) => {
        return <div key={ind}>
          <img src={image} alt="image"/>
          <p>Image 1</p>
        </div>
      })}
    </Carousel>
  </main>
}

export default Profile