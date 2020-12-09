import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Logo from '../images/Logo.png'

const BasicSignUp = (props) => {

  const [signupFormData, updateSignupFormData] = useState({
    first_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    bio: '',
    location: '',
    age: '',
    gender: '',
    gender_preference: ''
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

  function handleGender(event) {
    const value = event.target.id
    const data = {
      ...signupFormData,
      gender: value
    }
    updateSignupFormData(data)
  }

  function handleGenderPref(event) {
    const value = event.target.id
    const data = {
      ...signupFormData,
      gender_preference: value
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

  return <main className="regMain">
    <img src={Logo} alt="Logo"/>
    <h1>Get Started</h1>
    <form onSubmit={handleSubmit}>
      <label>First Name
        <input
          type="text"
          onChange={handleChange}
          value={signupFormData.first_name}
          name="first_name"
        />
      </label>

      <label>Email
        <input
          type="email"
          onChange={handleChange}
          value={signupFormData.email}
          name="email"
        />
      </label>

      <label>Password
        <input
          type="password"
          onChange={handleChange}
          value={signupFormData.password}
          name="password"
        />
      </label>

      <label>Confirm Password
        <input
          type="password"
          onChange={handleChange}
          value={signupFormData.password_confirmation}
          name="password_confirmation"
        />
      </label>

      <label>Age
        <input
          type="number"
          min="18"
          inputMode="numeric"
          onChange={handleChange}
          value={signupFormData.age}
          name="age"
        />
      </label>

      <label>First half of your postcode
        <input
          type="text"
          onChange={handleChange}
          value={signupFormData.location}
          name="location"
        />
      </label>

      <label>Bio
        <textarea
          onChange={handleChange}
          value={signupFormData.bio}
          name="bio"
        />
      </label>

      <label>Gender
        <select name="gender" onChange={handleGender}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </label>

      <button>Submit</button>

    </form >
  </main>

}

export default BasicSignUp