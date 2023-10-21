import { createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: 'loadedPosts',
    initialState: {posts:[]},
    reducers: {
        changePostsReducer: (state, action) => {
            state.posts = action.payload.posts;
        },
        changeLikeForSinglePostReducer: (state, action) => {
           state.posts.forEach((post)=>{
                console.log(post);
                console.log(post.ID == action.payload.postID);
                if(post.ID == action.payload.postID){
                    post.likeAmount += action.payload.likeAmount;
                }
            });
        }
    },
});
export default slice.reducer;


const { changePostsReducer } = slice.actions;
export const changePosts = ({ posts }) => dispatch => {
    try {
        dispatch(changePostsReducer({ posts }));
    } catch (e) {
        return console.error(e.message);
    }
}


const { changeLikeForSinglePostReducer } = slice.actions;
export const changeLikeForSinglePost = ({postID, likeAmount}) => dispatch =>{
    try {
        dispatch(changeLikeForSinglePostReducer({ postID, likeAmount }));
    } catch (e) {
        return console.error(e.message);
    }
}