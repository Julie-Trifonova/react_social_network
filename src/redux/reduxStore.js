import {createStore, legacy_createStore} from "redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

let store = legacy_createStore(reducers);

window.store = store;

// let store = configureStore(reducers);
// let store = configureStore({
//     reducer: {
//         profilePage: profileReducer, messagesPage: dialogsReducer
//     },
//     middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(),
// });


export default store;
