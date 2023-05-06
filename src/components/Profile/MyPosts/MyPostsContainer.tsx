import React from "react";
import { actions } from "../../../redux/profileReducer.ts";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts.tsx";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";

const MapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(MapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
