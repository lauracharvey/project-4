import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Logo from '../images/Logo.png'

const Signup = (props) => {

  const [signupFormData, updateSignupFormData] = useState({
    first_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    bio: '',
    location: '',
    age: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...signupFormData,
      [name]: value
    }
    updateSignupFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/signup', signupFormData)
      .then(res => {
        props.history.push('/')
      })
  }

  return <main>
    <img src={Logo} alt="Logo"/>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <label>first name
        <input
          type="text"
          onChange={handleChange}
          value={signupFormData.first_name}
          name="first_name"
        />
      </label>

      <label>email
        <input
          type="text"
          onChange={handleChange}
          value={signupFormData.email}
          name="email"
        />
      </label>

      <label>password
        <input
          type="password"
          onChange={handleChange}
          value={signupFormData.password}
          name="password"
        />
      </label>

      <label>confirm password
        <input
          type="password"
          onChange={handleChange}
          value={signupFormData.password_confirmation}
          name="password_confirmation"
        />
      </label>

      <label>age
        <input
          type="number"
          min="18"
          inputMode="numeric"
          onChange={handleChange}
          value={signupFormData.age}
          name="age"
        />
      </label>

      <label>first half of your postcode
        <input
          type="text"
          onChange={handleChange}
          value={signupFormData.location}
          name="location"
        />
      </label>

      <label>bio
        <textarea
          onChange={handleChange}
          value={signupFormData.bio}
          name="bio"
        />
      </label>

      <button>Submit</button>

    </form >
  </main>

}

export default Signup