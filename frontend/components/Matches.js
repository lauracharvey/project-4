import React, { useState, UseEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Navbar'

const Matches = (props) => {

  const [matches, updateMatches] = useState([])
  const [allUsers, updateAllUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('/api/users/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        updateMatches(resp.data.Matched)
      })

    axios.get('/api/users')
      .then(resp => {

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
  return <main className="matchesMain">
    <Header />
    <div className="matchesContainer">
      {filterMatched().map((user, index) => {
        const userChats = user.chats.filter((chat) => {
          return chat.user1 === 3 || chat.user2 === 3
        })
        return <div className="userDetails" key={index}>
          <div className="userImage">
            <img src={user.images[0].image1} />
          </div>
          <div className="buttonContainer">
            <Link to={`/matches/chat/${userChats[0].id}`}>
              <button>Chat</button>
            </Link>
            <button>Unspoon</button>
          </div>
        </div>
      })}
    </div>

    <Footer />
  </main>


}

export default Matches 