import React from 'react'
import PropTypes from 'prop-types'
import s from './Dialogs.module.css'

function Dialogs(props) {
  return (
    <div className={s.content}>
      Dialogs
      <div>Hello!</div>
      <div>Arch bridges - it's cool!</div>
    </div>
  )
}

Dialogs.propTypes = {}

export default Dialogs
