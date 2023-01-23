import React from "react";
import PropTypes from "prop-types";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profileReducer";


const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
    // newPostElement.current.value = '';
    //сама добавила
    console.log(props)
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <h3 className={s.postsBlock}>
      My posts
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          ></textarea>
        </div>
        <div>
          <button 
            onClick={addPost}
          >Add post</button>
        </div>
        <div>
          <button>Remove</button>
        </div>
      </div>
      <div>New post</div>
      <div className={s.posts}>{postsElements}</div>
    </h3>
  );
};

MyPosts.propTypes = {};

export default MyPosts;
