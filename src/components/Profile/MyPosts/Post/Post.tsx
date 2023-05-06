import React from "react";
import post_avatar from "../../../../assets/images/4.jpeg";
import styles from './Post.module.css'

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
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
