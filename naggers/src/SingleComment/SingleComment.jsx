import '../App.css';
import { useState } from 'react';


import "./SingleComment.css";
import { ExtraFunctions } from "../extraFunctions";
import TextWithReadMoreButton from "../TextWithReadMoreButtons";



export default function SingleComment(props) {
    return (
        <div className='SingleComment'>
            <div className='CommentAuthorDateInfo'>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <img className="CommentAuthorPic" src={require('../img/DefaultProfilePic.png')} ></img>
                    <div className="CommentAuthorName">{"normunds"}</div>
                </div>
                <div className='dateInfoAboutComment'>{ExtraFunctions.getTimeAgo(1)}</div>
            </div>

            <div className='commentText'><TextWithReadMoreButton text={props.text}></TextWithReadMoreButton></div>

            <div className='likesAndSettings'>
                <div onClick={()=>{}} className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{5}</div>
                <div className='ThreeDotIcon' ><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}


