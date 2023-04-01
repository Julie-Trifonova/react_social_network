import React from 'react'
import s from './ProfileInfo.module.css'

import landscape from '../../../assets/images/land_scape.jpg'

const ProfileInfo = (props) => {
  return (
        <div className='content'>
          <div>
            <img src={landscape} alt=''/>
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
