import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import profileReducer from "./profileReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
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

// type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T> = ReturnType<PropertiesType<T>>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

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
