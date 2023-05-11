import React from "react";
import avatar_message from '../../assets/images/original.jpg'

export const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = [1,2,3,4]
    return (
        <div style={{height: '400px', overflow: "auto"}}>
            {messages.map((message: any) => <Message/>)}
            {messages.map((message: any) => <Message/>)}
            {messages.map((message: any) => <Message/>)}
        </div>
    )
}

const Message: React.FC = () => {
    const message = {
        url: avatar_message,
        author: 'Nina',
        text: 'Hello, friends'
    }
    return (
    <div>
        <img style={{width: '40px'}} src={message.url} alt=''/> <b>{message.author}</b>
        <br/>
        {message.text}
        <hr/>
    </div>
    )
}


const AddMessageForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>send</button>
            </div>
        </div>
    )
}