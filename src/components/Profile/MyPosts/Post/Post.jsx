import React from "react";
import post_avatar from "../../../../assets/images/4.jpeg";
import styles from './Post.module.css'

const Post = (props) => {
  return (
    <div className={styles.item}>
      <img
        src={post_avatar}
        alt=""
      />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
