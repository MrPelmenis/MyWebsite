import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'commentWindow',
    initialState: {
        visible: false,
        authorName:"",
        uploadDate:"",
        title:"",
        body:"",
        likeAmount:"",
        postID: ""
    },
    reducers: {
        showCommentScreenRed: (state, action) => {
            console.log("actionpayload: " + action.payload.isPostLikedByUser);
            state.visible = true;
            state.authorName = action.payload.authorName;
            state.uploadDate = action.payload.uploadDate;
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.likeAmount = action.payload.likeAmount;
            state.postID = action.payload.postID;
            state.isPostLikedByUser = action.payload.isPostLikedByUser;
        },
        hideCommentScreenRed: (state, action) => {
            state.visible = false;
        },
        changeHelpTextReducer: (state, action) => {
            state.helpText = action.payload.helpText;
        },
    },
});
export default slice.reducer



const { showCommentScreenRed, hideCommentScreenRed, changeHelpTextReducer } = slice.actions
export const showCommentScreen = ({authorName,uploadDate, title, body, isPostLikedByUser, likeAmount, postID}) => async dispatch => {
    try {
        dispatch(showCommentScreenRed({authorName,uploadDate, title, body,isPostLikedByUser, likeAmount, postID}));
    } catch (e) {
        return console.error(e.message);
    }
}

export const hideCommentScreen = () => async dispatch => {
    try {
        return dispatch(hideCommentScreenRed())
    } catch (e) {
        return console.error(e.message);
    }
}

export const changeHelpText = ({helpText}) => async dispatch => {
    try {
         dispatch(changeHelpTextReducer({helpText}));
    } catch (e) {
        return console.error(e.message);
    }
}