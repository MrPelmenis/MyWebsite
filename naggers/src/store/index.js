import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import signInWindow from './signInWindow';
import currentUser from './currentUser';
import newPostWindow from './newPostWindow';
import loadedPosts from './loadedPosts';
import commentWindow from "./commentWindow";
import changeNameWindow from './changeNameWindow';

const reducer = combineReducers({
    signInWindow, currentUser, newPostWindow, loadedPosts, commentWindow, changeNameWindow,
})
const store = configureStore({
    reducer,
})
export default store;