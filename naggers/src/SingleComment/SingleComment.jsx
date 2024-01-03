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

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";

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


    const correctEditDeleteCommentButtons = () => {
        return (<div className='editAndDelete'>
                <div className='comment' onClick={()=>{alert("delete")}} >
                    <MdEdit style={{ width:"25px", height:"25px" }}/>
                </div>

                <span>|</span>
    
                <div className='comment' onClick={()=>{}}>
                    <MdDelete  style={{width:"25px", height:"25px"}}/>
                </div>
            </div>)
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
                        {isCommentLikedByUser != 1 ? (<AiOutlineLike style={{ width:"25px", height:"25px", marginTop: "2px" }}/>) : (<AiFillLike style={{ width:"25px", height:"25px" }}/>)}
                        <span style={{margin:"auto"}}>{currentLikeAmount}</span>
                </div>
                <HiddenEditDelteCommentButtons showMe={(props.authorName == currentUser)} title={props.title} body={props.body} commentID={props.id} />
            </div>
        </div>
    )
}




function HiddenEditDelteCommentButtons({showMe, title, body, PostId}){
    const [show, setShow] = useState(showMe);
    const dispatch = useDispatch();

    const showEditPostScreen = ()=>{
        alert("editcomment");
    }

    const showDeletePostScreen =()=>{
        alert("deleteComment");
    }

    const correctEditDeleteButtons = () => {
        return (<div className='hiddenEditDeleteButtonContainer'>
                <div className='myIcon' onClick={showEditPostScreen} >
                    <MdEdit style={{ width:"25px", height:"25px" }}/>
                </div>

                <span style={{padding:2, paddingTop:0}}>|</span>
    
                <div className='myIcon' onClick={()=>{ showDeletePostScreen()  }}>
                    <MdDelete  style={{width:"25px", height:"25px"}}/>
                </div>
            </div>)
    }

    if(!show){
        return(
            <div onClick={()=>setShow(!show)} className='hiddenEditDeleteComment'><MdMoreHoriz  style={{width:25,height: 25, margin:"auto"}}/></div>
        )
    }else{
        return(
            <div className='editDeleteHideCommentcontainer'>
                {correctEditDeleteButtons()}
                <div onClick={()=>setShow(!show)} className='hiddenEditDeleteComment'><MdMoreHoriz  style={{width:25,height: 25, margin:"auto", backgroundColor: "rgb(185, 183, 183)", borderRadius:50}}/></div>
            </div>
        )
    }

}

