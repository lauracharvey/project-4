import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'
import Header from './Header'
import Footer from './Navbar'


const Settings = () => {
  const userID = getUserId()

  let maleProps = {
    type: 'radio',
    id: 'male',
    name: 'gender',
    onFocus: handleSelect
  }



  function handleSelect(e) {
    console.log(e.target.id)
  }




  return <main className="settingsMain">
    <Header/>
    <form>
      <label>Looking for:
        <input 
          {...maleProps}
        />
        <label htmlFor="male">Male</label>

        <input 
          type="radio"
          id="female"
          name="gender"
          onFocus={handleSelect}
        />
        <label htmlFor="female">Female</label>

        <input 
          type="radio"
          id="other"
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