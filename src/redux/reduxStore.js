import {createStore, legacy_createStore} from "redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer
});

let store = legacy_createStore(reducers);
// let store = configureStore(reducers);
// let store = configureStore({
//     reducer: {
//         profilePage: profileReducer, messagesPage: dialogsReducer
//     },
//     middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(),
// });


export default store;
