import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Logo from '../images/Logo.jpg'

const Signup = () => {

  const [signupFormData, updateSignupFormData] = useState({
    first_name: '',
    email:'',
    password:'',
    passwordConfirmation:'',
    bio:'',
    location:'',
    age:''
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
        props.history.push('/swipes')
      })
  }

  return <main>
    <img src={Logo} alt="Logo"/>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <label>username
        <input
          type="text"
          onChange={handleChange}
          value={signupFormData.username}
          name="username"
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
          value={signupFormData.passwordConfirmation}
          name="passwordConfirmation"
        />
      </label>

      <label>age
        <textarea
          onChange={handleChange}
          value={signupFormData.age}
          name="age"
        />
      </label>

      <label>first half of your postcode
        <textarea
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