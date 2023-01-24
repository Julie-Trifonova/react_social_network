import React from 'react'
import PropTypes from 'prop-types'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import {sendMessageCreator, updateNewMessageCreator} from "../../redux/dialogsReducer";

const Dialogs = (props) => {

    let state = props.messagesPage;
    let messagesElements = state.messages
        .map(m => <Message key={m.id} id={m.id} message={m.message}/>);
    let dialogsElements = state.dialogs
        .map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    let newMessageBody = state.newMessageBody;

    let onSendMessagesClick = () => {
        // props.store.dispatch(sendMessageCreator());
        props.sendMessage();
    }
    let onNewMessageChange = (body) => {
        props.updateNewMessageBody(body)
        // props.store.dispatch(updateNewMessageCreator(body));
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {messagesElements}
            </div>
            <div className={s.messages}>
                <div>{dialogsElements}</div>
                <div><textarea value={newMessageBody}
                               onChange={onNewMessageChange}
                               placeholder='Enter your message'>
                </textarea></div>
                <div>
                    <button onClick={onSendMessagesClick}>Send</button>
                </div>
            </div>
        </div>
    )
}

Dialogs.propTypes = {}

export default Dialogs
