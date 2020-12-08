import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { getUserId } from '../lib/UserToken'

const Swipe = (props) => {
  const currUserID = getUserId()
  const [currUser, updateCurrUser] = useState({})
  const [allUsers, updateAllUsers] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${currUserID}`)
      .then(res => {
        const resData = res.data
        updateCurrUser(resData)
        console.log(resData)
      })

    axios.get('/api/users')
      .then(res => {
        updateAllUsers(res.data)
        console.log(res.data)
      })

  }, [])

  return <h1>SPOON ME</h1>
}

export default Swipe