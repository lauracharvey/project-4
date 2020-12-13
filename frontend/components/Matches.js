import React, { useState, UseEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Navbar'
import Back from '../images/previous.png'
import Settings from '../images/settings.png'
import { getUserId } from '../lib/UserToken'

const Matches = (props) => {
  const currUserID = getUserId()
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

  function unspoon(id) {
    const token = localStorage.getItem('token')
    axios.put(`/api/users/${id}/removematch`, '', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMatches(resp.data.Matched)
      })
  }


  return <main className="matchesMain">
    <header>
      <div>
        <Link to={'/swipe'}>
        <img src={Back} alt="back"/>
        </Link>
      </div>
      <div>
        <h1>Spoondr.</h1>
      </div>
      <div>
        <Link to={'/settings'}>
          <img src={Settings} alt='settings'></img>
        </Link>
        
      </div>
    </header>
    <div className="matchesContainer">
      {filterMatched().map((user, index) => {
        const userChats = user.chats.filter((chat) => {
          return chat.user1 === currUserID || chat.user2 === currUserID
        })
        return <div className="userDetails" key={index}>
          <div className="userImage">
            <img src={user.images[0].image1} />
          </div>
          <div className="buttonContainer">
            <Link to={`/matches/chat/${userChats[0].id}`}>
              <button>Chat</button>
            </Link>
            <button onClick={() => unspoon(user.id)}>Unspoon</button>
          </div>
        </div>
      })}
    </div>

    <Footer />
  </main>


}

export default Matches 