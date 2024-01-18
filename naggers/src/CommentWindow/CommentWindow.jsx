import '../App.css';
import { useState, useEffect } from 'react';
import './CommentWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';



import logoPic from '../img/labsLogo.png';



import { fetchSpecial } from '../serverComunication.js';





import { hideCommentScreen, changeHelpText, changeLoadedComments} from '../store/commentWindow';

import SinglePost from '../SinglePost/singlePost';
import SingleComment from '../SingleComment/SingleComment';
import { ExtraFunctions } from '../extraFunctions';
import { light } from '@mui/material/styles/createPalette';
import { Dialpad } from '@mui/icons-material';



export default function CommentWindow() {

    const dispatch = useDispatch();
    const commentWindow = useSelector(state => state.commentWindow);
    const currentUser = useSelector(state => state.currentUser);
    let loadedComments = commentWindow.loadedComments;
    const handleClose = () => {
        setArePostsLoaded(false);
        dispatch(hideCommentScreen());
    };


    

    async function uploadComment (){
        if(ExtraFunctions.isUserLoggedIn()){
            if(myCommentText != ""){
                let res = await fetchSpecial("uploadComment", { text: myCommentText, postID: commentWindow.postID }, false);
                console.log(res);
                if(res.answer){
                    setMyCommentText("");
                    dispatch(changeHelpText({helpText:""}));
                }
            }else{
                dispatch(changeHelpText({helpText:"You must enter something..."}));
            }
        }else{
            ExtraFunctions.googleLogin();
        }
        setArePostsLoaded(false);
    }
    

    //comment input code:
    const [myCommentText, setMyCommentText] = useState('');

    const handleChange = event => {
        setMyCommentText(event.target.value);
    };

    const [arePostsLoaded, setArePostsLoaded] = useState(false);

    const getCommentInfo = async () =>{
        if(!arePostsLoaded){
            setArePostsLoaded(true);
            console.log("updatojas komnetari");
            let commentsForPost = ((await fetchSpecial("getCommentsForPost", {postID:commentWindow.postID, clientName:currentUser.name}, !ExtraFunctions.isUserLoggedIn())));
            dispatch(changeLoadedComments({comments: commentsForPost}));
        }
    }


    if(commentWindow.visible){
        getCommentInfo();
    }
    
    const makeCommentsIntoReactObjects = (comments)=>{
            if(comments.length < 1){
                return(
                    <div style={{width:"100%", height:"100%", textAlign:"center", lineHeight:"200px", fontSize:"30px", color:'gray', userSelect: "none"}}> Be the first one to comment... </div>
                )
            }else{
                return comments.map(comment => {
                    return (<SingleComment key={Math.random()*10 + Math.random()*2}
                    commentID={comment.ID}
                    date={comment.Date_Time}
                    text={comment.Body}
                    likeAmount={comment.LikeAmount}
                    authorName={comment.AuthorName}
                    commentId={comment.postID}
                    isCommentLikedByCurrentUser={comment.isLikedByCurrentUser}
                    ></SingleComment>);
                });
            }
    }

    if (commentWindow.visible) {
        return (
            <div className="AllCommentContainer">
                <div className="commentWindow-white-box" style={{}}>
                    <div className="singleCommentPart" >
                        <div className="close-button" onClick={handleClose}>
                            X
                        </div>
                    </div>
                    
                    <div style={{ marginTop:-20, width: "100%"}}>
                        <SinglePost isThisCommentPost={true} date={commentWindow.uploadDate} title={commentWindow.title} body={commentWindow.body}
                        likeAmount={commentWindow.likeAmount} isPostLikedByUser={commentWindow.isPostLikedByUser} id={commentWindow.postID} readingUser={currentUser.name} authorName={commentWindow.authorName}></SinglePost>
                    </div>

                    <div className='CommentInput'> 
                        <textarea  placeholder='What Do You Think?'onChange={handleChange} value={myCommentText} className='CommentInputText'></textarea>
                        <div className='helpText'>{commentWindow.helpText}</div>
                        <button className='postCommentButton' onClick={()=>{uploadComment()}}>Post</button>
                    </div>
                    
                    
                    <div className='CommentContainer'>
                        {makeCommentsIntoReactObjects(commentWindow.loadedComments)}
                    </div>

                </div>
            </div>
        );

    } else {
        return (
            <></>
        )
    }

};
