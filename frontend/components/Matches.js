import React, { useState, UseEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        console.log(resp.data.Matched)
        updateMatches(resp.data.Matched)
      })

    axios.get('/api/users')
      .then(resp => {
        console.log(resp.data)
        updateAllUsers(resp.data)
      })
  }, [])

  function filterMatched() {
    const filter = allUsers.map(user => {
      const id = user.id
      const num = matches.indexOf(id)
      if (num !== -1) {
        return user
      } else return
    })
    return filter.filter(user => user !== undefined)
  }

  console.log(filterMatched())
  return <div>
    <h1>Matches</h1>
    {filterMatched().map((user, index) => {
      const userChats = user.chats.filter((chat) => {
        return chat.user1 === 3 || chat.user2 === 3
      })
      console.log(userChats[0].id)
      return <div key={index} style={{ border: '1px solid black', width: 'fit-content' }}>
        <img src={user.images[0].image1} style={{ width: '75px', height: 'auto' }}></img>
        <h2>{user.first_name}</h2>
        <p>{user.bio}</p>
        <p>User Chat ID = {userChats[0].id}</p>
        <Link to={`/matches/chat/${userChats[0].id}`}>
          <button>Chat now!</button>
        </Link>
      </div>
    })}
  </div>


}

export default Matches 