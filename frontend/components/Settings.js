import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'
import Header from './Header'
import Footer from './Navbar'


const Settings = () => {
  const userID = getUserId()
  const [currUser, updateCurrUser] = useState({})

  useEffect(() => {
    axios.get(`/api/users/${userID}`)
      .then(res => {
        updateCurrUser(res.data)
        console.log(res.data)
      })
  }, [])

  function handleGenderPref(event) {
    const value = event.target.value
    const data = {
      ...currUser,
      gender_preference: value
    }
    updateCurrUser(data)
    console.log(data)
  }



  return <main className="settingsMain">
    <Header />
    <form>
      <label>Looking for
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