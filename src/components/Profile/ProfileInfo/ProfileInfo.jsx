import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user_1.jpg";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.file[0])
        }
    }
  return (
        <div className='content'>
          <div className={styles.descriptionBlock}>
              <img className={styles.mainPhoto} src={profile.photos.large || userPhoto} alt=''/>
              {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
              <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          </div>
        </div>
  )
}

export default ProfileInfo
