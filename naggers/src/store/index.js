import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import signInWindow from './signInWindow';
import currentUser from './currentUser';

const reducer = combineReducers({
    signInWindow, currentUser
})
const store = configureStore({
    reducer,
})
export default store;