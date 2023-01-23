import { nanoid } from "nanoid";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

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

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
