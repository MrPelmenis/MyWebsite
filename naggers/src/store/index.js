import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import signInWindow from './signInWindow';
import currentUser from './currentUser';
import newPostWindow from './newPostWindow';

const reducer = combineReducers({
    signInWindow, currentUser, newPostWindow
})
const store = configureStore({
    reducer,
})
export default store;