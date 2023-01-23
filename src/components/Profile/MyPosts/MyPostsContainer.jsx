import React from "react";
import PropTypes from "prop-types";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {

  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <MyPosts updateNewPostText={onPostChange}
             addPost={addPost}
             posts={state.profilePage.posts}
              newPostText={state.profilePage.newPostText}/>
  );
};

MyPostsContainer.propTypes = {};

export default MyPostsContainer;
