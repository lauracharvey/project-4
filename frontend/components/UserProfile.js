import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Profile = (props) => {
  const userID = props.match.params.userID

  const [user, updateUser] = useState({})

  useEffect(() => {
    axios.get(`/api/users/${userID}`)
      .then(res => {
        updateUser(res.data)
        console.log(res.data)
      })
  }, [])

  if (!user.age) {
    return <h1>LOADING</h1>
  }

  return <h1>hello</h1>
}

export default Profile