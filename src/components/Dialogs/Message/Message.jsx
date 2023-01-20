import React from 'react'
import PropTypes from 'prop-types'
import s from '../Dialogs.module.css'
// import { NavLink } from "react-router-dom";

const Message = (props) => {
  return (
    <div className={s.message}>{props.message}</div>
  )
}

Message.propTypes = {}

export default Message