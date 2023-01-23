import React from "react";
import PropTypes from "prop-types";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    // props.addPost();
    props.dispatch(addPostActionCreator());
    console.log(props)
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    // props.newPostText(text);
    props.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <MyPosts/>
  );
};

MyPosts.propTypes = {};

export default MyPostsContainer;
