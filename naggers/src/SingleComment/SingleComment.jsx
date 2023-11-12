import '../App.css';
import { useState } from 'react';


import "./SingleComment.css";
import { ExtraFunctions } from "../extraFunctions";
import TextWithReadMoreButton from "../TextWithReadMoreButtons";

import { fetchSpecial } from '../serverComunication';
import { useDispatch, useSelector } from 'react-redux';

import configData from "../config.json";

export default function SingleComment(props) {

    const [isCommentLikedByUser, setIsCommentLikedByUser] = useState(props.isCommentLikedByCurrentUser);
    const [currentLikeAmount, setCurrentLikeAmount] = useState(props.likeAmount);

    const currentUser = useSelector(state => state.currentUser);
    
    console.log("iscommentlikedbycurrent user: " + isCommentLikedByUser);

    const commentLikeCallback = async () => {
        if(ExtraFunctions.isUserLoggedIn()){
            let result;
            console.log(props);
            result = await fetchSpecial("commentLike", {commentID: props.commentID, clientName: currentUser.name}, false);
            setIsCommentLikedByUser(result.statuss == "liked" ? 1: 0);
            setCurrentLikeAmount(result.currentLikeAmount);
            console.log(result); 
            
        }else{
            alert("you must be logged in to like comments, VAJAG VELAK SATAISIT");
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

            <div className='likesAndSettings'>
                <div onClick={()=>{commentLikeCallback();}} style={{backgroundColor:(isCommentLikedByUser =="1"?"red":"white")}} className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{currentLikeAmount}</div>
                <div className='ThreeDotIcon' ><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}


