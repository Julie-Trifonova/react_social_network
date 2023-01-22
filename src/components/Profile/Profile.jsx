import React from "react";
import PropTypes from "prop-types";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts 
        posts={props.profilePage.posts} 
        addPost={props.addPost}
        dispatch={props.dispatch}
        newPostText={props.profilePage.newPostText}
      />
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
