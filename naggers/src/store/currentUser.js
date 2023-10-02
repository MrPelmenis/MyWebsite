import { createSlice } from '@reduxjs/toolkit'
import { fetchSpecial } from "../serverComunication.js";
import { useDispatch } from 'react-redux';
import { showScreen } from '../store/signInWindow';

// Slice
const slice = createSlice({
    name: 'currentUser',
    initialState: await getUserDataFromServer(),
    reducers: {
        changeUserReducer: (state, action) => {
            state.name = action.payload.name;
            state.accountExists = action.payload.accountExists;
        }
    },
});
export default slice.reducer;


const { changeUserReducer } = slice.actions
export const changeUser = ({ name, accountExists }) => async dispatch => {
    try {
        dispatch(changeUserReducer({ name, accountExists }));
    } catch (e) {
        return console.error(e.message);
    }
}



async function getUserDataFromServer() {

    if (localStorage.getItem("JWT") != "") {
        const data = await fetchSpecial("getUsersNickname", {});
        // console.log("data:");

        if (data.accountExists) {
            console.log("from server");
            return ({ name: data.nickname, accountExists: true });

        } else {
            return ({ name: "", accountExists: false });
        }
    }
}











/*import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.user = null;
        },
    },
});
export default slice.reducer
// Actions
const { loginSuccess, logoutSuccess } = slice.actions
export const login = ({ username, password }) => async dispatch => {
    try {
        // const res = await api.post('/api/auth/login/', { username, password })
        dispatch(loginSuccess({ username }));
    } catch (e) {
        return console.error(e.message);
    }
}



export const logout = () => async dispatch => {
    try {
        // const res = await api.post('/api/auth/logout/')
        return dispatch(logoutSuccess())
    } catch (e) {
        return console.error(e.message);
    }


    https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/
}*/