import React from "react";
import PropTypes from "prop-types";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  return (
    <h3 className={s.postsBlock}>
      My posts
      <div>
        <div>
          <textarea></textarea>
        </div> 
        <div>
          <button>Add post</button>
        </div>       
        <div>
          <button>Remove</button>
        </div>
      </div>
      <div>New post</div>
      <div className={s.posts}>
        <Post message='Hi, how are you?' likesCount={0}/>
        <Post message='It`s my first post' likesCount={7}/>
      </div>
    </h3>
  );
};

MyPosts.propTypes = {};

export default MyPosts;
