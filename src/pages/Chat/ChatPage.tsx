import React, {useEffect, useState} from "react";
import avatar_message from '../../assets/images/original.jpg'
import useWebSocket from "react-use-websocket";
import {nanoid} from "nanoid";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

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
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...messages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: '400px', overflow: "auto"}}>
            {messages.map((m: any) => <Message key={nanoid()} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return (
    <div>
        <img style={{width: '40px'}} src={message.photo} alt=''/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
    )
}


const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if(!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}