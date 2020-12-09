import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'
import Header from './Header'
import Footer from './Navbar'


const Settings = () => {
  const userID = getUserId()

  function handleSelect(e) {
    console.log(e.target.id)
  }

  return <main className="settingsMain">
    <Header/>
    <form>
      
      <label>Looking for:
        <input 
          type="radio"
          id="Male"
          name="gender"
          onFocus={handleSelect}
        />
        <label htmlFor="male">Male</label>

        <input 
          type="radio"
          id="Female"
          name="gender"
          onFocus={handleSelect}
        />
        <label htmlFor="female">Female</label>

        <input 
          type="radio"
          id="Other"
          name="gender"
          onFocus={handleSelect}
        />
        <label htmlFor="other">Other</label>
      </label>
    </form>
    <Footer/>
  </main>
}

export default Settings