import React from 'react'
import s from './Dialogs.module.css'
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {

    let state = props.messagesPage;
    let messagesElements = state.messages
        .map(m => <Message key={m.id} id={m.id} message={m.message}/>);
    let dialogsElements = state.dialogs
        .map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Navigate to="/login" replace/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {messagesElements}
            </div>
            <div className={s.messages}>
                <div>{dialogsElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component='textarea'
                    name='newMessageBody'
                    placeholder='Enter your message'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs
