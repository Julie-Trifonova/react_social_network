import {nanoid} from "nanoid";
import {InferActionsTypes} from "./reduxStore";

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

const dialogsReducer = ( state = initialState, action: ActionsTypes)
    : InitialStateType => {
    switch(action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': {
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

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({
        type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody
    } as const)
}

export  default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>