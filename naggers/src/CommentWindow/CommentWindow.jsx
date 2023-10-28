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
        
    }
    

    //comment input code:
    const [myCommentText, setMyCommentText] = useState('');

    const handleChange = event => {
        setMyCommentText(event.target.value);
        console.log('value is:', myCommentText);
    };


    


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
                        <SingleComment text="sdfgnujklsdfgbnjklsjdfgbnklhsdrfgbhjk;sdgbhjk;sdfgbjk;bjk;dfgbhjk;kopcgusrhmtgu9prtchnoisdfgnujklsdfgbnjklsjdfgbnklhsdrfgbhjk;sdgbhjk;sdfgbjk;bjk;dfgbhjk;kopcgusrhmtgu9prtchnoidtcgh,rtdiumhsdfgnujklsdfgbnjklsjdfgbnklhsdrfgbhjk;sdgbhjk;sdfgbjk;bjk;dfgbhjk;kopcgusrhmtgu9prtchnoidtcgh,rtdiumhsdfgnujklsdfgbnjklsjdfgbnklhsdrfgbhjk;sdgbhjk;sdfgbjk;bjk;dfgbhjk;kopcgusrhmtgu9prtchnoidtcgh,rtdiumhdtcgh,rtdiumh"></SingleComment>
                        <SingleComment text="aaa"></SingleComment>
                        <SingleComment text="aaa"></SingleComment>
                        <SingleComment text="aaa"></SingleComment>
                        <SingleComment text="aaa"></SingleComment>
                        <SingleComment text="aaa"></SingleComment>
                        <SingleComment text="aaa"></SingleComment>
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