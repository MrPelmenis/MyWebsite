import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'changeNameWindow',
    initialState: {
        visible: false,
    },
    reducers: {
        showChangeNameWindow: (state, action) => {
            state.visible = true;
        },
        hideChangeNameWindow: (state, action) => {
            state.visible = false;
        },
    },
});
export default slice.reducer



const { showChangeNameWindow, hideChangeNameWindow } = slice.actions
export const showPostScreen = () => async dispatch => {
    try {
        dispatch(showChangeNameWindow());
    } catch (e) {
        return console.error(e.message);
    }
}

export const hidePostScreen = () => async dispatch => {
    try {
        return dispatch(hideChangeNameWindow())
    } catch (e) {
        return console.error(e.message);
    }
}

