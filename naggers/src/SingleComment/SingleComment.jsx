import '../App.css';
import { useState } from 'react';


import "./SingleComment.css";
import TextWithReadMoreButton from "../TextWithReadMoreButtons";

import { fetchSpecial } from '../serverComunication';
import { useDispatch, useSelector } from 'react-redux';

import configData from "../config.json";


import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

import { ExtraFunctions } from '../extraFunctions';

export default function SingleComment(props) {

    const [isCommentLikedByUser, setIsCommentLikedByUser] = useState(props.isCommentLikedByCurrentUser);
    const [currentLikeAmount, setCurrentLikeAmount] = useState(props.likeAmount);

    const currentUser = useSelector(state => state.currentUser);

    const commentLikeCallback = async () => {
        if(ExtraFunctions.isUserLoggedIn()){
            let result;
            console.log(props);
            result = await fetchSpecial("commentLike", {commentID: props.commentID, clientName: currentUser.name}, false);
            setIsCommentLikedByUser(result.statuss == "liked" ? 1: 0);
            setCurrentLikeAmount(result.currentLikeAmount);
            console.log(result); 
        }else{
            ExtraFunctions.googleLogin();
        }
    }


    return (
        <div className='SingleComment'>
            <div className='CommentAuthorDateInfo'>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <img className="CommentAuthorPic" src={`${configData.SERVER_URL}/index.php?requestAnonymus=getProfilePictureForUser&clientName=${props.authorName}`} ></img>
                    <div className="CommentAuthorName">{props.authorName}</div>
                </div>
                <div className='dateInfoAboutComment'>{ExtraFunctions.getTimeAgo(props.date)}</div>
            </div>

            <div className='commentText'><TextWithReadMoreButton text={props.text}></TextWithReadMoreButton></div>

            <div className='CommentLikesAndComments'>
            <div className='CommentlikeIconAndCount' onClick={()=>{commentLikeCallback()}} >
                    {isCommentLikedByUser != 1 ? (<AiOutlineLike style={{ width:"25px", height:"25px" }}/>) : (<AiFillLike style={{ width:"25px", height:"25px" }}/>)}
                    <span style={{margin:"auto"}}>{currentLikeAmount}</span>
                </div>
            </div>
        </div>
    )
}


