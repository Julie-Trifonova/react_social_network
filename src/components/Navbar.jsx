import React from 'react'
import PropTypes from 'prop-types'

const Navbar = (props) => {
  return (
    <nav className='nav'>
        <div>
          <a>
            Profile
          </a>
        </div>
        <div>
          <a>
            Messages
          </a>
        </div>
        <div>
          <a>
            News
          </a>
        </div>
        <div>
          <a>
            Music
          </a>
        </div>
        <div>
          <a>
            Settings
          </a>
        </div>
      </nav>
  )
}

Navbar.propTypes = {}

export default Navbar
