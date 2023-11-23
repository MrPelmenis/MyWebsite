import '../App.css';
import { useState } from 'react';
import "./singlePost.css";

import { ExtraFunctions } from "../extraFunctions";
import { fetchSpecial } from '../serverComunication';

import { useDispatch, useSelector } from 'react-redux';

import { changeLikeForSinglePost } from '../store/loadedPosts';


import { showCommentScreen } from '../store/commentWindow';

import TextWithReadMoreButton from "../TextWithReadMoreButtons";

import configData from "../config.json";


import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";


export default function SinglePost({id, title, body, authorName, date, likeAmount, readingUser, isPostLikedByUser, isThisCommentPost}) {
    
    const dispatch = useDispatch();
    const loadedPosts = useSelector(state => state.loadedPosts);


    console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
    console.log(body);
    const [readyBody, setReadyBody]  = useState(body);
    console.log(readyBody);



    //dispatch(changePosts({posts:recentPosts}));

    const commentWindowVisibility = useSelector(state => state.commentWindow).visible;
    //alert(commentWindowVisibility);
    
    const [isPostInComments, setIsPostInComments] = useState(isThisCommentPost);
    const [postAuthorName, setPostAuthorName] = useState(authorName);

    const showComments = () => {

        if(!isPostInComments){
            dispatch(showCommentScreen({authorName:authorName, uploadDate: date, title:title, body:readyBody, likeAmount:likeAmount, postID:id}));
        }else{
            alert("vajag nosktolot lejaa uz komentariem jo sis posts jau ir komentaa");
        }
        
       // alert(commentWindowVisibility);
    };

    const [postID, setPostID] = useState(id);
    const [currentUser, setcurrentUser] = useState(readingUser);
    const  likeCallback = async ()=>{
        if(!isThisCommentPost){
            if(ExtraFunctions.isUserLoggedIn()){
                let result;
                if(isPostLikedByUser == 0){
                    result = await fetchSpecial("postLike", {postID: postID, clientName: currentUser}, false);
                    console.log("aaa");
                    console.log(loadedPosts);
                }else{
                   result = await fetchSpecial("postDislike", {postID: postID, clientName: currentUser}, false);
                   console.log(result);
                }
                
                dispatch(changeLikeForSinglePost({postID:postID, serverResult:result}));
    
                console.log(result);
            }else{
                alert("you must be logged in to like posts, VAJAG VELAK SATAISIT");
            }
        }
       
    }
    
   
    
    return (
        <div className='SinglePost'>
            <div className='authorDateInfo'>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <img className="authorPic" src={`${configData.SERVER_URL}/index.php?requestAnonymus=getProfilePictureForUser&clientName=${postAuthorName}`} ></img>
                    <div className="authorName">{authorName}</div>
                </div>
                <div className='dateInfoAboutPost'>{ExtraFunctions.getTimeAgo(date)}</div>
            </div>

            <div className='titleText'>{title}</div>
            <div className='postText'><TextWithReadMoreButton text={readyBody}></TextWithReadMoreButton></div>

            <div className='likesAndComments'>
                <div style={{display:"flex"}}>
                    <div className='likeIconAndCount' onClick={()=>{likeCallback()}} >
                        {isPostLikedByUser != 1 ? (<AiOutlineLike style={{ width:"25px", height:"25px" }}/>) : (<AiFillLike style={{ width:"25px", height:"25px" }}/>)}
                        <span style={{margin:"auto"}}>{likeAmount}</span>
                    </div>
                    <div style={{marginRight:10}}>|</div>
                    <div className='comment' onClick={()=>{ showComments()  }}><AiOutlineComment  style={{marginLeft:"15px",paddingRight:"15px", width:"25px", height:"25px"}}/></div>
                </div>
                
            </div>
        </div>
    )
}