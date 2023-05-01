import React, {useState} from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user_1.jpg";
import ProfileDataForm from "../ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.file[0])
        }
    }

    const onSubmit = (formData) => {
        // e.preventDefault()
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

  return (
        <div className='content'>
          <div className={styles.descriptionBlock}>
              <img className={styles.mainPhoto} src={profile.photos.large || userPhoto} alt=''/>
              {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
              {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                  : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>
              }
              <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          </div>
        </div>
  )
}

export const Contact = ({contactTitle, contactValue}) => {
    return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {

    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            <div>
                <b>About me</b>: {profile.userId}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
}

export default ProfileInfo
