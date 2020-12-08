import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { getUserId } from '../lib/UserToken'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Like from '../images/like.png'
import Dislike from '../images/dislike.png'
import Superlike from '../images/superlike.png'
import Undo from '../images/undo.png'

const Swipe = (props) => {
  const currUserID = getUserId()
  const [currUser, updateCurrUser] = useState({})
  const [allUsers, updateAllUsers] = useState([])
  const [filteredUsers, updateFilteredUsers] = useState([])
  const [lastDirection, setLastDirection] = useState()

  useEffect(() => {
    let resData
    axios.get(`/api/users/${currUserID}`)
      .then(res => {
        resData = res.data
        updateCurrUser(resData)
        console.log(resData)
      })

    axios.get('/api/users')
      .then(res => {
        updateAllUsers(res.data)
        const tempAllUsers = res.data

        filterMatched(resData, tempAllUsers)
      })
  }, [])

  const alreadyRemoved = []

  function filterMatched(resData, tempAllUsers) {
    if (resData.matches === undefined) return
    const likeDislike = [...resData.matches[0].Liked, resData.matches[0].Disliked].flat()
    const currLikes = likeDislike
    const filter = tempAllUsers.map(user => {
      const num = currLikes.indexOf(user.id)
      if (num !== -1) {
        return
      } else return user
    })
    return updateFilteredUsers(filter.filter(user => user !== undefined))
  }

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete, direction)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const childRefs = useMemo(() => Array(filteredUsers.length).fill(0).map(i => React.createRef()), [])


  if (!currUser.matches) {
    return <h1>LOADING</h1>
  }

  return <main className="swipeMain">
    <Header />
    <div className="cardContainer">
      {filteredUsers.map((user, index) => {
        return <TinderCard ref={childRefs[index]} className='swipe' key={user.first_name} onSwipe={(dir) => swiped(dir, user.id)} >
          <div style={{ backgroundImage: `url(${user.images[0].image1})` }} className='card'>
          </div>
          <div className="nameAge">
            <h3 className="name-age">{user.first_name}, <strong>{user.age}</strong></h3>
          </div>
        </TinderCard>
      })}
    </div>

    <div className="smallButtonContainer">
      <div class="smallButton">
        <img src={Undo} alt="undo" />
      </div>
      <div class="smallButton">
        <img src={Superlike} alt="superlike" />
      </div>
    </div>
    <div className="largeButtonContainer">
      <div class="largeButton">
        <img className="dislike" src={Dislike} alt="dislike" />
      </div>
      <div class="largeButton">
        <img className="like" src={Like} alt="like" />
      </div>
    </div>
    <Navbar />
  </main>
}

export default Swipe