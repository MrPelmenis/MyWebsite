import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'newPostWindow',
    initialState: {
        visible: false,
    },
    reducers: {
        showNewPostScreen: (state, action) => {
            state.visible = true;
        },
        hideNewPostScreen: (state, action) => {
            state.visible = false;
        },
    },
});
export default slice.reducer



const { showNewPostScreen, hideNewPostScreen } = slice.actions
export const showPostScreen = () => async dispatch => {
    try {
        dispatch(showNewPostScreen());
    } catch (e) {
        return console.error(e.message);
    }
}

export const hidePostScreen = () => async dispatch => {
    try {
        return dispatch(hideNewPostScreen())
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