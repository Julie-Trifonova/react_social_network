import React from 'react'
import PropTypes from 'prop-types'
import s from './Dialogs.module.css'
import { NavLink } from "react-router-dom";
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';

const Dialogs = (props) => {

  let messagesElements = props.messages
    .map( m => <Message key={m.id} id={m.id} message={m.message}/>);

    let dialogsElements = props.dialogs
    .map( d => <DialogItem key={d.id} id={d.id} name={d.name}/>);

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {messagesElements}
      </div>
      <div className={s.messages}>
        {dialogsElements}
      </div>
    </div>
  )
}

Dialogs.propTypes = {}

export default Dialogs
