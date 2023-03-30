import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader";

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
  return (
    <div>
      <ProfileInfo profile={props.profile}/>
      <MyPostsContainer store={props.store}/>
    </div>
  );
};

export default Profile;
