import {nanoid} from "nanoid";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Yo" },
        { id: 3, message: "Good afternoon" },
        { id: 4, message: "What a fantastic view!" },
        { id: 5, message: "Tom" },
        { id: 6, message: "It`s such a perspective!" },
    ],
    dialogs: [
        { id: 1, name: "Lexa" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Jake" },
        { id: 4, name: "Tim" },
        { id: 5, name: "Tom" },
        { id: 6, name: "Dany" },
    ],
    newMessageBody: '',
};

const dialogsReducer = ( state = initialState, action ) => {
    let stateCopy;

    switch(action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            stateCopy = {
                ...state,
                newMessageBody: action.body
            }
            return stateCopy;
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody;
            stateCopy = {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: nanoid(), message: body}],
            }
            // stateCopy.messages.push({id: nanoid(), message: body});
            return stateCopy;
        }
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE
})

export const updateNewMessageCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body
})

export  default dialogsReducer;