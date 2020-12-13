import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/Logo.png'
import axios from 'axios'

const Home = (props) => {

  const [loginFormData, updateLoginFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const data = {
      ...loginFormData,
      [event.target.name]: event.target.value
    }
    updateLoginFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', loginFormData)
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/swipe')
        } else {
          updateLoginFormData({
            email: '',
            password: ''
          })
        }

      })
  }

  return <main className="loginMain">
    <img className="hero" src={Logo} alt="logo" />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={loginFormData.email}
        name="email"
        placeholder="hello@spoondr.com"
      />
      <input
        type="password"
        onChange={handleChange}
        value={loginFormData.password}
        name="password"
        placeholder="&#10034; &#10034; &#10034; &#10034; &#10034; &#10034;"
      />
      <button>Login</button>
      <p>not registered yet?</p>
      <Link to="/signup"><button>Signup</button></Link>
    </form>
  </main>
}

export default Home