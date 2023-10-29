import '../App.css';
import { useState, useEffect } from 'react';
import './CommentWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';



import logoPic from '../img/labsLogo.png';


import configData from "../config.json";


import { fetchSpecial } from '../serverComunication.js';





import { hideCommentScreen, showCommentScreen } from '../store/commentWindow';

import SinglePost from '../SinglePost/singlePost';
import SingleComment from '../SingleComment/SingleComment';
import { ExtraFunctions } from '../extraFunctions';

export default function CommentWindow() {

    const dispatch = useDispatch();
    const commentWindow = useSelector(state => state.commentWindow);

    const handleClose = () => {
        setArePostsLoaded(false);
        dispatch(hideCommentScreen());
    };

    async function uploadPost (){
        if(ExtraFunctions.isUserLoggedIn()){
            if(myCommentText != ""){
                let res = await fetchSpecial("uploadComment", { text: myCommentText, postID: commentWindow.postID }, false);
                console.log(res);
                if(res.answer){
                    setMyCommentText("");
                }
            }else{
                alert("You must enter something");
            }
        }else{
            alert("You have to be logged in to comment on posts VAJAG VEL SATAISIT");
        }
        setArePostsLoaded(false);
        
    }
    

    //comment input code:
    const [myCommentText, setMyCommentText] = useState('');

    const handleChange = event => {
        setMyCommentText(event.target.value);
    };


    const [loadedComments, setLoadedComments] = useState([]);

    const [arePostsLoaded, setArePostsLoaded] = useState(false);

    const getCommentInfo = async () =>{
        if(!arePostsLoaded){
            setArePostsLoaded(true);
            console.log("updatojas komnetari");
            let commentsForPost = ((await fetchSpecial("getCommentsForPost", {postID:commentWindow.postID}, true)));
            setLoadedComments(commentsForPost);
        }
        
    }


    if(commentWindow.visible){
        getCommentInfo();
    }
    
    const makeCommentsIntoReactObjects = (comments)=>{
        return comments.map(comment => {
            return (<SingleComment key={Math.random()*10 + Math.random()*2}
            commentID={comment.ID}
            date={comment.Date_Time}
            text={comment.Body}
            likeAmount={comment.LikeAmount}
            authorName={comment.AuthorName}
            postId={comment.postID}
            ></SingleComment>);
        });
    }


    if (commentWindow.visible) {
        return (
            <div className="AllCommentContainer">
                <div className="white-box" style={{}}>
                    <div className="singleCommentPart" >
                        <div className="close-button" onClick={handleClose}>
                            X
                        </div>
                    </div>
                    
                    <div style={{height:140, border: "1px solid white", marginTop:-20, width: "100%"}}>
                        <SinglePost isThisCommentPost={true} date={commentWindow.uploadDate} title={commentWindow.title} body={commentWindow.body}
                        likeAmount={commentWindow.likeAmount} authorName={commentWindow.authorName}></SinglePost>
                    </div>

                    <div className='CommentInput'> 
                        <textarea  placeholder='What Do You Think?'onChange={handleChange} value={myCommentText} className='CommentInputText'></textarea>
                        <button className='postCommentButton' onClick={()=>{uploadPost()}}>Post</button>
                    </div>
                    
                    
                    <div className='CommentContainer'>
                        {makeCommentsIntoReactObjects(loadedComments)}
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






/*<div className="white-box">
                    <div className="close-button" onClick={handleClose}>
                        X
                    </div>
                    <div className="topPart">
                        <img className='signInPic' src={logoPic}></img>
                        <div className="signinText">Sign In</div>
                    </div>

                    <div className="inputDiv">
                        <input type="text" placeholder="Nickname" className="signInInput"></input>
                        <input type="password" placeholder="Password" className="signInInput"></input>
                    </div>
                </div>*/