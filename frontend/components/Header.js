import React from 'react'
import Settings from '../images/settings.png'
import { Link } from 'react-router-dom'

const Header = () => {

  return <header>
    <div className="spacerDiv"></div>
    <div>
      <h1>Spoondr.</h1>
    </div>
    <div className="settingsDiv">
      <Link to={'/settings'}>
      <img src={Settings} alt="settings"/>
      </Link>
      
    </div>
    
  </header>
  
}

export default Header