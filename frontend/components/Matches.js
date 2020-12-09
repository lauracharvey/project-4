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
    <div className="chatContainer">

    </div>
    <Header />
    <h2>your matches - tap to chat</h2>
    <div className="matchesContainer">
      {filterMatched().map((user, index) => {
        const userChats = user.chats.filter((chat) => {
          return chat.user1 === 3 || chat.user2 === 3
        })
        console.log(userChats[0].id)
        return <div key={index}>
          <Link to={`/matches/chat/${userChats[0].id}`}>
            <div className="userImage">
              <img src={user.images[0].image1} />
            </div>
          </Link>
        </div>
      })}
    </div>

    <Footer />
  </main>


}

export default Matches 