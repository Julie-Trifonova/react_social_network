import React from 'react'
import PropTypes from 'prop-types'
import s from './Navbar.module.css' 

const Navbar = (props) => {
  return (
    <nav className={s.nav}>
        <div className={`${s.item} ${s.active}`}>
          <a>
            Profile
          </a>
        </div>
        <div className={`${s.item} ${s.active}`}>
          <a>
            Messages
          </a>
        </div>
        <div className={`${s.item} ${s.active}`}>
          <a>
            News
          </a>
        </div>
        <div className={`${s.item} ${s.active}`}>
          <a>
            Music
          </a>
        </div>
        <div className={`${s.item} ${s.active}`}>
          <a>
            Settings
          </a>
        </div>
      </nav>
  )
}

Navbar.propTypes = {}

export default Navbar
