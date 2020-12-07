import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'

import Login from './components/LoginHome'
import SignUp from './components/BasicSignUp'
import Matches from './components/Matches'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/matches" component={Matches} />
    </Switch>
  </BrowserRouter>
)


export default App