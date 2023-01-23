import {createStore, legacy_createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";

let store_old = legacy_createStore();
let store = configureStore();

let reducers = combineReducers()



export default store;
export {store_old}