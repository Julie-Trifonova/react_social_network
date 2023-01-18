import React from 'react'
import PropTypes from 'prop-types'
import s from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
  return (
        <div className='content'>
          <div>
            <img src='https://img5.goodfon.ru/original/1680x1050/e/10/new-zealand-sunset-mountains-landscape.jpg' alt=''/>
          </div>
          <div className={s.descriptionBlock}>
            ava + description
          </div>
        </div>
  )
}

ProfileInfo.propTypes = {}

export default ProfileInfo
