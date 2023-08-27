import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'signInWindow',
    initialState: {
        visible: false,
    },
    reducers: {
        showLoginScreen: (state, action) => {
            state.visible = true;
        },
        hideLoginScreen: (state, action) => {
            state.visible = false;
        },
    },
});
export default slice.reducer



const { showLoginScreen, hideLoginScreen } = slice.actions
export const showScreen = () => async dispatch => {
    try {
        dispatch(showLoginScreen());
    } catch (e) {
        return console.error(e.message);
    }
}

export const hideScreen = () => async dispatch => {
    try {
        return dispatch(hideLoginScreen())
    } catch (e) {
        return console.error(e.message);
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