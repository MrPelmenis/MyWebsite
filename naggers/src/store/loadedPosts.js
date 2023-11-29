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
                
                if(Number(post.ID) == action.payload.postID){
                    if(action.payload.serverResult.statuss == "liked"){
                        post.LikeAmount =  Number(post.LikeAmount) + 1;
                        post.isLikedByCurrentUser = true;
                    }
                    if(action.payload.serverResult.statuss == "disliked"){
                        post.LikeAmount =  Number(post.LikeAmount) - 1;
                        post.isLikedByCurrentUser = false;
                    }
                } 
            })
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
export const changeLikeForSinglePost = ({postID, serverResult}) => dispatch =>{
    try {
        dispatch(changeLikeForSinglePostReducer({ postID, serverResult }));
    } catch (e) {
        return console.error(e.message);
    }
}