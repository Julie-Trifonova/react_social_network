import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post.tsx";
import AddNewPostFormRedux, {AddPostFormValuesType} from "./AddNewPostForm.tsx";
import {PostType} from "../../../redux/types/types";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let postsElements = props.posts.map((p) => (
        <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    ));

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div>New post</div>
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
}

const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized;
