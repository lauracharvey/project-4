import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'


const Profile = (props) => {
  const userID = props.match.params.userID
  const [user, updateUser] = useState({})
  const [slideImages, updateSlideImages] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${userID}`)
      .then(res => {
        const resData = res.data
        updateUser(resData)
        Object.keys(resData.images[0]).map((key) => {
          if (key.includes('image') && resData.images[0][key] !== null) {
            const images = [...slideImages, resData.images[0][key]]

            updateSlideImages(images)
          }
        })
      })
  }, [])

  if (!slideImages[0]) {
    return <h1>LOADING</h1>
  }

  return <main>

  </main>
}

export default Profile