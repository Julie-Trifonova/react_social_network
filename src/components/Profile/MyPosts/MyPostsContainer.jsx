import React from "react";
import PropTypes from "prop-types";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


// const MyPostsContainer = (props) => {
//
//   let state = props.store.getState();
//
//   let addPost = () => {
//     props.store.dispatch(addPostActionCreator());
//   };
//
//   let onPostChange = (text) => {
//     props.store.dispatch(updateNewPostTextActionCreator(text));
//   };
//
//   return (
//     <MyPosts updateNewPostText={onPostChange}
//              addPost={addPost}
//              posts={state.profilePage.posts}
//               newPostText={state.profilePage.newPostText}/>
//   );
// };

const MapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}
const MapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text)=> {
      dispatch(updateNewPostTextActionCreator(text));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  }
}

const MyPostsContainer = connect(MapStateToProps, MapDispatchToProps)(MyPosts);

MyPostsContainer.propTypes = {};

export default MyPostsContainer;
