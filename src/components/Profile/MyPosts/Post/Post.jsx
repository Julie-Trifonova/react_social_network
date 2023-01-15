import React from "react";
import PropTypes from "prop-types";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://www.ejin.ru/wp-content/uploads/2018/10/avatarki-dlya-skype1.jpeg"
        alt=""
      />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
