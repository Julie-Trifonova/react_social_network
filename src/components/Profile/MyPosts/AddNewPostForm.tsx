import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import React from "react";

export let AddNewPostForm = (props) => {
    const maxLength10 = maxLengthCreator(10);
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                name='newPostText'
                component={Textarea}
                validate={[required, maxLength10]}
                placeholder={'Post message'}
            />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}
export default reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)