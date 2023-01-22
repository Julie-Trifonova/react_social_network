import { nanoid } from "nanoid";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 5 },
        { id: 2, message: "It`s my first post", likesCount: 27 },
      ],
      newPostText: "itBro",
    },
    messagesPage: {
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
    },
  },
  _callSubscriber() {
    console.log("state change");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: nanoid(),
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      
      console.log('before', this._state.profilePage.newPostText)
      this._state.profilePage.newPostText = "";
      console.log('after',this._state.profilePage.newPostText)


      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.messagesPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.messagesPage.newMessageBody;
      this._state.messagesPage.newMessageBody = '';
      this._state.messagesPage.messages.push({ id: nanoid(), message: body });
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({
    type: ADD_POST
  })

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
  })


export const sendMessageCreator = () => ({
  type: SEND_MESSAGE
})

export const updateNewMessageCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY, body: body
})

window.store = store;

export default store;
