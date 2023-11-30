import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'changeNameWindow',
    initialState: {
        visible: false,
        helpText:"What's the name you want now?",
    },
    reducers: {
        showChangeNameWindow: (state, action) => {
            state.visible = true;
        },
        hideChangeNameWindow: (state, action) => {
            state.visible = false;
        },
        changeHelpTextReducer: (state, action) => {
            state.helpText = action.payload.helpText;
        },
    },
});
export default slice.reducer



const { showChangeNameWindow, hideChangeNameWindow,changeHelpTextReducer } = slice.actions
export const showChangeNameScreen = () => async dispatch => {

    try {
        dispatch(showChangeNameWindow());
    } catch (e) {
        return console.error(e.message);
    }
}

export const hideChangeNameScreen = () => async dispatch => {
    try {
        return dispatch(hideChangeNameWindow())
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


