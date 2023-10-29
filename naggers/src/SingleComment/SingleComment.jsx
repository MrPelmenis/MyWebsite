import '../App.css';
import { useState } from 'react';


import "./SingleComment.css";
import { ExtraFunctions } from "../extraFunctions";
import TextWithReadMoreButton from "../TextWithReadMoreButtons";

import { fetchSpecial } from '../serverComunication';
import { useDispatch, useSelector } from 'react-redux';


export default function SingleComment(props) {
    const [isCommentLikedByUser, setIsCommentLikedByUser] = useState(0);

    const currentUser = useSelector(state => state.currentUser);


    const commentLikeCallback = async () => {
        if(ExtraFunctions.isUserLoggedIn()){
            let result;
            if(isCommentLikedByUser == 0){
                console.log(props);
                result = await fetchSpecial("commentLike", {commentID: props.commentID, clientName: currentUser.name}, false);
                console.log(result);
            }else{
               //result = await fetchSpecial("postDislike", {postID: postID, clientName: currentUser}, false);
            }
            
            //dispatch(changeLikeForSinglePost({postID:postID, serverResult:result}));

            //console.log(result);
        }else{
            alert("you must be logged in to like comments, VAJAG VELAK SATAISIT");
        }
    }


    return (
        <div className='SingleComment'>
            <div className='CommentAuthorDateInfo'>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <img className="CommentAuthorPic" src={require('../img/DefaultProfilePic.png')} ></img>
                    <div className="CommentAuthorName">{props.authorName}</div>
                </div>
                <div className='dateInfoAboutComment'>{ExtraFunctions.getTimeAgo(props.date)}</div>
            </div>

            <div className='commentText'><TextWithReadMoreButton text={props.text}></TextWithReadMoreButton></div>

            <div className='likesAndSettings'>
                <div onClick={()=>{commentLikeCallback()}} className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{props.likeAmount}</div>
                <div className='ThreeDotIcon' ><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}


