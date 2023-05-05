import React from "react";
import { addPostActionCreator } from "../../../redux/profileReducer.ts";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const MapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}
const MapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  }
}

const MyPostsContainer = connect(MapStateToProps, MapDispatchToProps)(MyPosts);

MyPostsContainer.propTypes = {};

export default MyPostsContainer;
