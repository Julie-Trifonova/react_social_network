import React from 'react'
import PropTypes from 'prop-types'

const Profile = (props) => {
  return (
    <div className='content'>
        <div>
          <img src='https://img5.goodfon.ru/original/1680x1050/e/10/new-zealand-sunset-mountains-landscape.jpg' alt=''/>
        </div>
        <div>
          ava + description
        </div>
        <div>
          My posts
          <div>
            New post
          </div>
          <div>
            <div>
              post 1
            </div>
            <div>
              post 2
            </div>
          </div>
        </div>
      </div>
  )
}

Profile.propTypes = {}

export default Profile
