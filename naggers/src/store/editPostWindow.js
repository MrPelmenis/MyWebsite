import { AssistWalker } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'editPostWindow',
    initialState: {
        visible: false,
        helpText: "",
        title:"",
        body: "",
        postID: "",
    },
    reducers: {
        showEditPostScreen: (state, action) => {
            state.visible = true;
        },
        hideEditPostScreen: (state, action) => {
            state.visible = false;
        },
        changeEditHelpTextReducer: (state, action) => {
            state.helpText = action.payload.helpText;
        },

        changeEditTitleBody: (state, action) => {
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.postID = action.payload.postID;
            console.log("postID = ", state.postID);
        },
    },
});
export default slice.reducer;



const { showEditPostScreen, hideEditPostScreen, changeEditHelpTextReducer, changeEditTitleBody} = slice.actions
export const showPostEditScreen = () => async dispatch => {
    try {
        dispatch(showEditPostScreen());
    } catch (e) {
        return console.error(e.message);
    }
}

export const hidePostEditScreen = () => async dispatch => {
    try {
        dispatch(hideEditPostScreen())
    } catch (e) {
        return console.error(e.message);
    }
}

export const changeEditHelpText = ({helpText}) => async dispatch => {
    try {
         dispatch(changeEditHelpTextReducer({helpText}));
    } catch (e) {
        return console.error(e.message);
    }
}


export const editPostTitleBody = ({title, body, postID}) => async dispatch => {
    try {
         dispatch(changeEditTitleBody({title,body, postID}));
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