import React, { useState, UseEffect, useEffect } from 'react'
import axios from 'axios'

const Matches = (props) => {

  const [matches, updateMatches] = useState([])
  const [allUsers, updateAllUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('/api/users/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateMatches(resp.data)
      })

    axios.get('/api/users')
      .then(resp =>{
        console.log(resp.data)
        updateAllUsers(resp.data)
      })
  }, [])

  return <div>
    <p>hello world</p>
  </div>


}

export default Matches 