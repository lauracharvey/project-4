import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'
import Header from './Header'
import Footer from './Navbar'


const Settings = () => {
  const userID = getUserId()
  return <main className="settingsMain">
    <Header/>
    <Footer/>
  </main>
}

export default Settings