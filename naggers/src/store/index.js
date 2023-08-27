import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import signInWindow from './signInWindow';


const reducer = combineReducers({
    signInWindow
})
const store = configureStore({
    reducer,
})
export default store;