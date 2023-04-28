import {applyMiddleware, compose, createStore, legacy_createStore} from "redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

// let store = configureStore(reducers);
// let store = configureStore({
//     reducer: {
//         profilePage: profileReducer, messagesPage: dialogsReducer
//     },
//     middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(),
// });


export default store;
