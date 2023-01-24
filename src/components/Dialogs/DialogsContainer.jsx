import React from 'react'
import PropTypes from 'prop-types'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import {sendMessageCreator, updateNewMessageCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

// const DialogsContainer = (props) => {
//
//     let state = props.store.getState().messagesPage;
//
//     let onSendMessagesClick = () => {
//         props.store.dispatch(sendMessageCreator());
//     }
//     let onNewMessageChange = (e) => {
//         let body = e.target.value;
//         props.store.dispatch(updateNewMessageCreator(body));
//     }
//     return <Dialogs updateNewMessageBody={onNewMessageChange}
//                     sendMessage={onSendMessagesClick}
//                     messagesPage={state}
//     />
// }

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageCreator(body));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

DialogsContainer.propTypes = {}

export default DialogsContainer
