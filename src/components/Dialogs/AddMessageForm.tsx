import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls.tsx";
import {maxLengthCreator, required} from "../../utils/validators/validators.ts";
import React from "react";
import {NewMessageFormValuesType} from "./Dialogs";

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>
    = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesTypeKeys>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea, {})}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)