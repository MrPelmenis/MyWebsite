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
            state.visible = true;
            state.authorName = action.payload.authorName;
            state.uploadDate = action.payload.uploadDate;
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.likeAmount = action.payload.likeAmount;
            state.postID = action.payload.postID;
        },
        hideCommentScreenRed: (state, action) => {
            state.visible = false;
        },
    },
});
export default slice.reducer



const { showCommentScreenRed, hideCommentScreenRed } = slice.actions
export const showCommentScreen = ({authorName,uploadDate, title, body, likeAmount, postID}) => async dispatch => {
    try {
        dispatch(showCommentScreenRed({authorName,uploadDate, title, body, likeAmount, postID}));
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