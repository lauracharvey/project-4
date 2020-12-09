import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'
import Footer from './Navbar'
import Back from '../images/previous.png'


const Settings = (props) => {
  const userID = getUserId()
  const [currUser, updateCurrUser] = useState({})

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  function handleGenderPref(event) {
    const value = event.target.value
    const data = {
      ...currUser,
      gender_preference: value
    }
    axios.put(`/api/users/${userID}/update`, data)
      .then(res => {
        console.log(res.data)
      })
  }

  return <main className="settingsMain">
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
        {localStorage.getItem('token')
          && <img onClick={handleLogout} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828427.svg'} alt={'signout'}/>}
      </div>
    </header>
    
    <form>
      <label>Looking for:
        <select name="gender_preference" onChange={handleGenderPref}>
          <option disabled selected>Please Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Both">Both</option>
        </select>
      </label>
    </form>
    <Footer />
  </main>
}

export default Settings