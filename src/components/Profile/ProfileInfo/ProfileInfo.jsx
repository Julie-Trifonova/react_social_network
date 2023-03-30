import React from 'react'
import PropTypes from 'prop-types'
import s from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
  return (
        <div className='content'>
          <div>
            <img src='https://catherineasquithgallery.com/uploads/posts/2021-02/1612605223_96-p-fon-khvoinii-les-193.jpg' alt=''/>
          </div>
          <div className={s.descriptionBlock}>
              <img src={props.profile.photos.large} alt=''/>
            ava + description
          </div>
        </div>
  )
}

ProfileInfo.propTypes = {}

export default ProfileInfo
