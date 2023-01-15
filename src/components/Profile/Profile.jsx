import React from 'react'
import PropTypes from 'prop-types'
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'

const Profile = (props) => {
  return (
        <div className={s.content}>
            <div>
              <img src='https://img5.goodfon.ru/original/1680x1050/e/10/new-zealand-sunset-mountains-landscape.jpg' alt=''/>
            </div>
            <div>
              ava + description
            </div>
            <MyPosts/>
          </div>
  )
}

Profile.propTypes = {}

export default Profile
