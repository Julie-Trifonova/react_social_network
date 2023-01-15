import React from 'react'
import PropTypes from 'prop-types'
import s from './Header.module.css'

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://cdn.cssauthor.com/wp-content/uploads/2012/12/accelrys1.png?strip=all&lossy=1&resize=730%2C500&ssl=1"
        alt=""
      />
    </header>
  );
}

Header.propTypes = {}

export default Header;
