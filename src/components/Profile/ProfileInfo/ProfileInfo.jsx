import React from 'react'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

import landscape from '../../../assets/images/land_scape.jpg'
import Preloader from "../../common/Preloader";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }
  return (
        <div className='content'>
          {/*<div>*/}
          {/*  <img src={landscape} alt=''/>*/}
          {/*</div>*/}
          <div className={s.descriptionBlock}>
              <img src={props.profile.photos.large} alt=''/>
              <ProfileStatus status={props.status}/>
          </div>
        </div>
  )
}

export default ProfileInfo
