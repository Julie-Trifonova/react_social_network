import {applyMiddleware, compose, createStore, legacy_createStore} from "redux";
import {combineReducers} from 'redux'
import profileReducer from "./profileReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer.ts";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducers // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;

// let store = configureStore(rootReducers);
// let store = configureStore({
//     reducer: {
//         profilePage: profileReducer, messagesPage: dialogsReducer
//     },
//     middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(),
// });


export default store;
