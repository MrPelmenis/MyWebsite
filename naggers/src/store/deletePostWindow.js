import { AssistWalker } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'deletePostWindow',
    initialState: {
        visible: false,
        helpText: "",
        PostId:""
    },
    reducers: {
        showDeletePostScreen: (state, action) => {
            state.visible = true;
        },
        hideDeletePostScreen: (state, action) => {
            state.visible = false;
        },
        changeDeletablePost: (state, action) => {
            state.PostId = action.payload.PostId
        },
    },
});
export default slice.reducer;



const { showDeletePostScreen, hideDeletePostScreen, changeDeletablePost} = slice.actions
export const showDeleteScreen = () => async dispatch => {
    try {
        dispatch(showDeletePostScreen());
    } catch (e) {
        return console.error(e.message);
    }
}

export const hideDeleteScreen = () => async dispatch => {
    try {
        dispatch(hideDeletePostScreen())
    } catch (e) {
        return console.error(e.message);
    }
}

export const changeDeletePost = ({PostId}) => async dispatch => {
    try {
         dispatch(changeDeletablePost({PostId}));
    } catch (e) {
        return console.error(e.message);
    }
}
