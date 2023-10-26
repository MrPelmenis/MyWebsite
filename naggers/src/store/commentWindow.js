import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'commentWindow',
    initialState: {
        visible: true,
    },
    reducers: {
        showCommentScreenRed: (state, action) => {
            state.visible = true;
        },
        hideCommentScreenRed: (state, action) => {
            state.visible = false;
        },
    },
});
export default slice.reducer



const { showCommentScreenRed, hideCommentScreenRed } = slice.actions
export const showCommentScreen = () => async dispatch => {
    try {
        dispatch(showCommentScreenRed());
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