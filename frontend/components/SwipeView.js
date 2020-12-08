import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { getUserId } from '../lib/UserToken'

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
    const currLikes = resData.matches[0].Liked
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
  
  return <main className="main">
    <div className="cardContainer">
      {filteredUsers.map((user, index) => {
        return <TinderCard ref={childRefs[index]} className='swipe' key={user.first_name} onSwipe={(dir) => swiped(dir, user.first_name)} >
          <div style={{ backgroundImage: `url(${user.images[0].image1})` }} className='card'>
            <h3 className="name-age">{user.first_name} - {user.age}</h3>
          </div>
        </TinderCard>
      })}
    </div>
  </main>
}

export default Swipe