import React from "react";
import PropTypes from "prop-types";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {

  let postslements = props.posts
    .map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

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
        {postslements}
      </div>
    </h3>
  );
};

MyPosts.propTypes = {};

export default MyPosts;
