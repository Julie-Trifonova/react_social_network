import React, {useEffect, useState} from "react";
import avatar_message from '../../assets/images/original.jpg'
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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        function createChannel() {
            setWsChannel(new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
        }
        createChannel()
    }, [])

    useEffect(() => {
        wsChannel?.addEventListener('close', () => {
            console.log('CLOSE WS')
        })
    }, [wsChannel])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel?.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...messages, ...newMessages])
        })
    }, [wsChannel])

    return (
            <div style={{height: '400px', overflow: "auto"}}>
                {messages.map((m: any) => <Message key={nanoid()} message={m}/>)}
            </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img style={{width: '40px'}} src={message.photo} alt=''/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        wsChannel?.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                ></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus !== 'ready'}
                        onClick={sendMessage}
                >Send
                </button>
            </div>
        </div>
    )
}
