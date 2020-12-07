import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/UserToken'


const Settings = () => {
  const userID = getUserId()
  return <Link to={`/updateprofile/${userID}`}>Update Profile</Link>
}

export default Settings