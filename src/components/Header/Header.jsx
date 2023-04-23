import React from 'react'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://cdn.cssauthor.com/wp-content/uploads/2012/12/accelrys1.png?strip=all&lossy=1&resize=730%2C500&ssl=1"
        alt=""
      />
        <div className={s.loginBlock}>
            { props.isAuth
                ? <div>
                    {props.login}
                    <button onClick={props.logout}>Log out</button>
                </div>
                : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
  );
}

export default Header;
