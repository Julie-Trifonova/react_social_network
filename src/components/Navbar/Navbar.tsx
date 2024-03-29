import React  from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Profile
        </NavLink>
      </div>
        <div className={s.item}>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Users
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/dialogs"
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? s.active : s.inactive)}
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
