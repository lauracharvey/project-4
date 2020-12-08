import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = () => {

  return <footer>
    <nav>
      <Link>
      <img src='https://www.flaticon.com/svg/static/icons/svg/25/25379.svg' alt='link to messages'/>
      </Link>
      <Link>
      <img src='https://www.flaticon.com/svg/static/icons/svg/25/25379.svg' alt='speech bubble'/>
      </Link>
      <Link>
      <img src='https://www.flaticon.com/svg/static/icons/svg/2522/2522086.svg' alt='link to own profile'/>
      </Link>
    
    </nav>
  </footer>

}

export default withRouter(Navbar)