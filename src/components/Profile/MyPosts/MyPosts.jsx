import React from "react";
import PropTypes from "prop-types";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
        <button>Remove</button>
      </div>
      <div>New post</div>
      <div className={s.posts}>
        <Post message='Hi, how are you?' likesCount={0}/>
        <Post message='It`s my first post' likesCount={7}/>
      </div>
    </div>
  );
};

MyPosts.propTypes = {};

export default MyPosts;
