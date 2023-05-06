import React, {ChangeEvent, useState} from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader.tsx";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx";
import userPhoto from "../../../assets/images/user_1.jpg";
import ProfileDataForm from "../ProfileDataForm.tsx";
import {ContactsType, ProfileType} from "../../../redux/types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // e.preventDefault()
        // todo: remove then
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
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>
                }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {

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
            <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo
