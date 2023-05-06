import React from 'react'
import s from './Dialogs.module.css'
import Message from './Message/Message.tsx';
import DialogItem from './DialogItem/DialogItem.tsx';
import {Navigate} from "react-router-dom";
import AddMessageFormRedux from './AddMessageForm.tsx'
import {InitialStateType} from "../../redux/dialogsReducer.ts";

type OwnPropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.messagesPage;
    let messagesElements = state.messages
        .map(m => <Message key={m.id} id={m.id} message={m.message}/>);
    let dialogsElements = state.dialogs
        .map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values: NewMessageFormValuesType) => {
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

export default Dialogs
