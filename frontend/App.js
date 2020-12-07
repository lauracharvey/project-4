import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'

import Login from './components/LoginHome'
import SignUp from './components/BasicSignUp'
import Settings from './components/Settings'
import UpdateProfile from './components/UpdateUserProfile'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/updateprofile/:userID" component={UpdateProfile} />
    </Switch>
  </BrowserRouter>
)


export default App