import '../App.css';
import { useState, useEffect } from 'react';
import './CommentWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';



import logoPic from '../img/labsLogo.png';


import configData from "../config.json";


import { fetchSpecial } from '../serverComunication.js';





import { hideCommentScreen } from '../store/commentWindow';

import SinglePost from '../SinglePost/singlePost';
import SingleComment from '../SingleComment/SingleComment';

export default function CommentWindow() {

    const dispatch = useDispatch();
    const commentWindowVisibility = useSelector(state => state.commentWindow).visible;

    const handleClose = () => {
        dispatch(hideCommentScreen());
    };

    const uploadPost = ()=>{
        alert("upload");
    }
    

    const [helperText, setHelperText] = useState("What name do you want to be known by ?");

    if (commentWindowVisibility) {
        return (
            <div className="AllCommentContainer">
                <div className="white-box" style={{}}>
                    <div className="singleCommentPart" >
                        <div className="close-button" onClick={handleClose}>
                            X
                        </div>
                    </div>

                    <div style={{height:140, border: "1px solid white", marginTop:-20, width: "100%"}}>
                        <SinglePost isThisCommentPost={true} date={(new Date(new Date() - 100000) )} title={"aaa"} body={"gzsdrfbhijklsdftgbhiloysjdfgbhkl"}
                        likeAmount={5} authorName={"kaka"}></SinglePost>
                    </div>

                    <div className='CommentInput'> 
                        <textarea  placeholder='What Do You Think?' className='CommentInputText'></textarea>
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