import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators.ts";
import {Textarea} from "../../common/FormsControls/FormsControls.tsx";

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                name='newPostText'
                component={Textarea}
                validate={[required, maxLength10, ]}
                placeholder={'Post message'}
            />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

const MyPosts = React.memo((props) => {
    let postsElements = props.posts.map((p) => (
        <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    ));

    let newPostElement = React.createRef();

    let onAddPost = (values) => {
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
});   

export default MyPosts;
