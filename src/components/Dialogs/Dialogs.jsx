import React from 'react'
import PropTypes from 'prop-types'
import s from './Dialogs.module.css'
import { NavLink } from "react-router-dom";
import Message from './Message';
import DialogItem from './DialogItem';

function Dialogs(props) {

  let dialogData = [
    {id: 1, name: 'Lexa'},
    {id: 2, name: 'Alex'},
    {id: 3, name: 'Jake'},
    {id: 4, name: 'Tim'},
    {id: 5, name: 'Tom'},
    {id: 6, name: 'Dany'},
  ]

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name='Lexa' id='1'/>
        <DialogItem name='Alex' id='2'/>
        <DialogItem name='Jake' id='3'/>
        <DialogItem name='Tim' id='4'/>
        <DialogItem name='Tom' id='5'/>
        <DialogItem name='Dany' id='6'/>
      </div>
      <div className={s.messages}>
        <Message message='Hi'/>
        <Message message='Yo'/>
        <Message message='Good afternoon'/>
        <Message message='What a fantastic view!'/>
        <Message message='It`s such a perspective!'/>
      </div>
    </div>
  )
}

Dialogs.propTypes = {}

export default Dialogs
