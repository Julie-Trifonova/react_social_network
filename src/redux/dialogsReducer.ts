import {nanoid} from "nanoid";

const SEND_MESSAGE = 'SEND-MESSAGE';

type MessagesType = {
    id: string
    message: string
}
type DialogType = {
    id: string
    name: string
}
let initialState = {
    messages: [
        { id: nanoid(), message: "Hi" },
        { id: nanoid(), message: "Yo" },
        { id: nanoid(), message: "Good afternoon" },
        { id: nanoid(), message: "What a fantastic view!" },
        { id: nanoid(), message: "Tom" },
        { id: nanoid(), message: "It`s such a perspective!" },
    ] as Array<MessagesType>,
    dialogs: [
        { id: nanoid(), name: "Leo" },
        { id: nanoid(), name: "Alex" },
        { id: nanoid(), name: "Jake" },
        { id: nanoid(), name: "Tim" },
        { id: nanoid(), name: "Tom" },
        { id: nanoid(), name: "Dany" },
    ] as Array<DialogType>
};
export type InitialStateType = typeof initialState

const dialogsReducer = ( state = initialState, action: SendMessageCreatorActionType)
    : InitialStateType => {
    switch(action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: nanoid(), message: body}],
            }
        }
        default:
            return state
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string)
    : SendMessageCreatorActionType => ({
    type: SEND_MESSAGE, newMessageBody
})

export  default dialogsReducer