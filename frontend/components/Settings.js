import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'
import Footer from './Navbar'
import Back from '../images/previous.png'


const Settings = (props) => {
  const userID = getUserId()

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  function handleSelect(e) {
    console.log(e.target.id)
  }

  return <main className="settingsMain">
    <header>
      <div>
        <img src={Back} alt="back"/>
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
        <select name="gender" onChange={handleSelect}>
          <option>Male</option>
          <option>Female</option>
          <option>Both</option>
        </select>
      </label>
    </form>
    <Footer />
  </main>
}

export default Settings