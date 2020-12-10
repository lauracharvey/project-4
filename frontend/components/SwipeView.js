import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { getUserId } from '../lib/UserToken'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Superlike from '../images/superlike.png'
import UserProfile from '../images/multiple-users-silhouette.png'
import Modal from 'react-modal'

const Swipe = (props) => {
  const currUserID = getUserId()
  const [currUser, updateCurrUser] = useState({})
  const [allUsers, updateAllUsers] = useState([])
  const [filteredUsers, updateFilteredUsers] = useState([])
  const [lastDirection, setLastDirection] = useState()
  let swipeUserID
  const alreadyRemoved = []
  const [lastMatch, updateLastMatch] = useState('')

  useEffect(() => {
    let resData
    axios.get(`/api/users/${currUserID}`)
      .then(res => {
        resData = res.data
        updateCurrUser(resData)
      })

    axios.get('/api/users')
      .then(res => {
        updateAllUsers(res.data)
        const tempAllUsers = res.data

        filterMatched(resData, tempAllUsers)
      })
  }, [])

  function filterMatched(resData, tempAllUsers) {
    if (resData.matches === undefined) return
    const likeDislike = [...resData.matches[0].Liked, resData.matches[0].Disliked, resData.matches[0].Matched].flat()
    const currLikes = likeDislike
    const userPref = resData.gender_preference
    const prefFilter = tempAllUsers.filter(user => {
      return user.gender === userPref || userPref === 'Both'
    })
    const filter = prefFilter.map(user => {
      const num = currLikes.indexOf(user.id)
      if (num !== -1) {
        return
      } else return user
    })
    return updateFilteredUsers(filter.filter(user => user !== undefined))
  }


  const swiped = (direction, id) => {
    const token = localStorage.getItem('token')

    if (direction === 'right') {
      setLastDirection(direction)
      alreadyRemoved.push(id)
      axios.put(`/api/users/${id}/like`, '', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          console.log(resp.data)
          if (resp.data.message === 'match!') {
            openMatchModal()
            const position = allUsers.findIndex(e => e.id === Number(resp.data.id) )
            updateLastMatch(allUsers[position].images[0].image1)
            console.log(lastMatch)
          }
        })

    } else if (direction === 'left') {
      setLastDirection(direction)
      alreadyRemoved.push(id)
      axios.put(`/api/users/${id}/dislike`, '', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          console.log(resp.data)
          return
        })

    } else if (direction === 'up') {
      setLastDirection(direction)
      alreadyRemoved.push(id)
      axios.put(`/api/users/${id}/like`, '', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          console.log(resp.data)
          return
        })
    }
  }

  function goToProfile() {
    return props.history.push(`/profile/${swipeUserID}`)
  }

  const childRefs = useMemo(() => Array(filteredUsers.length).fill(0).map(i => React.createRef()), [])


  // ! Modal ------------
  

  Modal.setAppElement('#root')

  const [matchModalIsOpen, setMatchIsOpen] = useState(false)


  function openMatchModal() {
    setMatchIsOpen(true)
  }

  function closeMatchModal() {
    setMatchIsOpen(false)
  }


  if (!currUser.matches) {
    return <h1>LOADING</h1>
  }




  return <main className="swipeMain">

    <Modal isOpen={matchModalIsOpen} contentLabel="Match Modal">
      <div className="userDetails">
        <img className="userImage" src={`${currUser.images[0].image1}`} />
        <img className="userImage" src={`${lastMatch}`} />
        <p>Spoon!</p>
      </div>
      <div className="buttonContainer">
        <button className="button is-black" style={{ border: '3px solid white', margin: '20px', minWidth: '100px' }} onClick={() => closeMatchModal()}>ok</button>
      </div>
    </Modal>


    <Header />
    <div className="cardContainer">
      {filteredUsers.map((user, index) => {
        swipeUserID = user.id
        return <TinderCard ref={childRefs[index]} className='swipe' key={user.first_name} onSwipe={(dir) => swiped(dir, user.id)}>
          <div style={{ backgroundImage: `url(${user.images[0].image1})` }} className='card'>
          </div>
          <div className="nameAge">
            <h3 className="name-age">{user.first_name}, <strong>{user.age}</strong></h3>
          </div>
        </TinderCard>
      })}
    </div>

    <div className="smallButtonContainer">
      <div className="smallButton">
        <img src={UserProfile} alt="userprofile" onClick={goToProfile} />
      </div>
      <div className="smallButton">
        <img src={Superlike} alt="superlike" />
      </div>
    </div>
    <Navbar />
  </main>
}

export default Swipe