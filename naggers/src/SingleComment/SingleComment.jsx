import '../App.css';
import { useState } from 'react';


import "./SingleComment.css";
import { ExtraFunctions } from "../extraFunctions";
import TextWithReadMoreButton from "../TextWithReadMoreButtons";



export default function SingleComment(props) {

   //console.log(props.date);
    console.log("te notiek rekursija!!!");
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
                <div onClick={()=>{}} className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{props.likeAmount}</div>
                <div className='ThreeDotIcon' ><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}


