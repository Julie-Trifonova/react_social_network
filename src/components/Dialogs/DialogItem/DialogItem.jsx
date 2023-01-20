import React from 'react'
import PropTypes from 'prop-types'
import s from '../Dialogs.module.css'
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {

  let path = '/dialods/' + props.id;

  return (
    
    <div className={s.dialog + ' ' + s.active}>
      <NavLink to={path}>
        {props.name}
      </NavLink>
    </div>
  )
}

DialogItem .propTypes = {}

export default DialogItem