import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Logo from '../images/Logo.png'

const UpdateProfile = (props) => {
  const [currUser, updateCurrUser] = useState({})
  const [currUserImages, updateCurrUserImages] = useState({})
  const [currUserSocials, updateCurrUserSocials] = useState({})
  const [interests, updateInterests] = useState([])
  const [currInterests, updateCurrInterests] = useState([])
  const [text, updateText] = useState('')
  const [formData, updateFormData] = useState({
    first_name: '',
    bio: '',
    location: '',
    images: [{
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: ''
    }],
    socials: [{
      Facebook: '',
      Instagram: '',
      LinkedIn: '',
      Spotify: ''
    }],
    interests: []
  })
  const userID = props.match.params.userID

  useEffect(() => {
    axios.get(`/api/users/${userID}`)
      .then(res => {
        const resData = res.data
        updateCurrUser(resData)
        updateFormData(resData)
        updateCurrInterests(resData.interests)
      })

    axios.get(`/api/users/${userID}/images`)
      .then(res => {
        updateCurrUserImages(res.data)
        // console.log(res.data)
      })

    axios.get(`/api/users/${userID}/socials`)
      .then(res => {
        updateCurrUserSocials(res.data)
        // console.log(res.data)
      })

    axios.get(`/api/interests/${userID}`)
      .then(res => {
        updateInterests(res.data)
      })
  }, [])

  function handleSubmit() {
    const data = {
      ...formData,
      interests: currInterests,
      images: [currUserImages],
      socials: [currUserSocials]
    }

    // console.log(data)
    
    axios.put(`/api/users/${userID}/update`, data)
      .then(res => {
        console.log(res.data)
        props.history.push('/swipes')
      })
  }

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleImage(e) {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'spoondr',
        uploadPreset: 'spoondr',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        const data = {
          ...currUserImages,
          [e]: result.info.secure_url
        }
        updateCurrUserImages(data)
      }
    ).open()
  }

  function removeImage(e) {
    const data = {
      ...currUserImages,
      [e]: ''
    }
    updateCurrUserImages(data)
  }

  function handleSocials(e) {
    const name = e.target.name
    const value = e.target.value
    const data = {
      ...currUserSocials,
      [name]: value
    }
    updateCurrUserSocials(data)
    // console.log(currUserSocials)
  }

  function handleAddInterests(e) {
    const data = [
      ...currInterests,
      e
    ]
    updateCurrInterests(data)

    const int = [...interests]
    const filtInt = int.filter((el) => el.name !== e.name)
    updateInterests(filtInt)
  }

  function handleRemoveInterests(e) {
    const ints = [...currInterests]
    const filtInt = ints.filter((el) => el.name !== e.name)
    updateCurrInterests(filtInt)

    const unusedInts = [...interests, e]
    updateInterests(unusedInts)
  }

  function handleCreateInterest(e) {
    const data = { name: e.target.value }
    updateText('')

    axios.put(`/api/users/${userID}/interests`, data)
      .then(res => {
        const ints = [...currInterests, res.data]
        updateCurrInterests(ints)
      })
  }

  if (!currUser.interests) {
    return <h1>LOADING</h1>
  }

  return <main>
    <img className="hero" src={Logo} alt="logo" />
    <div>
      {/* ***** GENERAL INFO ***** */}
      <label>First Name
        <input
          type="text"
          onChange={handleChange}
          name="first_name"
          placeholder={formData.first_name}
        />
      </label>

      <label>Bio
        <textarea
          onChange={handleChange}
          placeholder={formData.bio}
          name="bio"
        />
      </label>

      <label>Location
        <input
          type="text"
          onChange={handleChange}
          placeholder={formData.location}
          name="location"
        />
      </label>

      {/* ***** IMAGES ***** */}
      <label>Image 1</label>
      <img
        src={currUserImages.image1}
        alt="Upload"
        width="100"
        height="125"
        name="image1"
        onClick={(e) => handleImage(e.target.name)}
      />
      {currUserImages.image1 && <button name="image1" onClick={(e) => removeImage(e.target.name)}>X</button>}

      <label>Image 2</label>
      <img
        src={currUserImages.image2}
        alt="Upload"
        width="100"
        height="125"
        name="image2"
        onClick={(e) => handleImage(e.target.name)}
      />
      {currUserImages.image2 && <button name="image2" onClick={(e) => removeImage(e.target.name)}>X</button>}

      <label>Image 3</label>
      <img
        src={currUserImages.image3}
        alt="Upload"
        width="100"
        height="125"
        name="image3"
        onClick={(e) => handleImage(e.target.name)}
      />
      {currUserImages.image3 && <button name="image3" onClick={(e) => removeImage(e.target.name)}>X</button>}

      <label>Image 4</label>
      <img
        src={currUserImages.image4}
        alt="Upload"
        width="100"
        height="125"
        name="image4"
        onClick={(e) => handleImage(e.target.name)}
      />
      {currUserImages.image4 && <button name="image4" onClick={(e) => removeImage(e.target.name)}>X</button>}

      <label>Image 5</label>
      <img
        src={currUserImages.image5}
        alt="Upload"
        width="100"
        height="125"
        name="image5"
        onClick={(e) => handleImage(e.target.name)}
      />
      {currUserImages.image5 && <button name="image5" onClick={(e) => removeImage(e.target.name)}>X</button>}

      {/* ***** SOCIALS ***** */}
      <label>Instagram
        <input
          type="text"
          onChange={(e) => handleSocials(e)}
          value={currUserSocials.Instagram}
          name="Instagram"
        />
      </label>

      <label>Facebook
        <input
          type="text"
          onChange={(e) => handleSocials(e)}
          value={currUserSocials.Facebook}
          name="Facebook"
        />
      </label>

      <label>LinkedIn
        <input
          type="text"
          onChange={(e) => handleSocials(e)}
          value={currUserSocials.LinkedIn}
          name="LinkedIn"
        />
      </label>

      <label>Spotify
        <input
          type="text"
          onChange={(e) => handleSocials(e)}
          value={currUserSocials.Spotify}
          name="Spotify"
        />
      </label>

      {/* ***** INTERESTS ***** */}
      <label>My Interests</label>
      {currInterests.map((el, i) => {
        return <div onClick={(e) => handleRemoveInterests(el)} key={i}>{el.name}</div>
      })}

      <label>Click To Add Interests</label>
      {interests.map((el, i) => {
        return <div onClick={(e) => handleAddInterests(el)} key={i}>{el.name}</div>
      })}

      <label>Create Interest
        <input 
          type="text"
          onChange={(e) => updateText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleCreateInterest(e)
            }
          }}
          value={text}
        />
      </label>

      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  </main>
}

export default UpdateProfile