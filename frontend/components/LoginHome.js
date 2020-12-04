import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/Logo.jpg'
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
          localStorage.setItem('token', resp.data.token)
          props.history.push('/swipe')
        })
    }

    return <main>
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
          placeholder="********"
        />
        <button>Login</button>
      </form>
      <p>not registered yet?</p>
      <Link to="/signup"><button>Signup</button></Link>
    </main>
  }

  export default Home