import {maxLengthCreator, required} from "../../../utils/validators/validators.ts";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../common/FormsControls/FormsControls.tsx";
import React from "react";

type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    const maxLength10 = maxLengthCreator(10)
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddPostFormValuesTypeKeys>('Post message', 'newPostText', [required, maxLength10], Textarea, {})}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}
export default reduxForm<AddPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)