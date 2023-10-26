import '../App.css';
import { useState } from 'react';
import "./singlePost.css";

import { ExtraFunctions } from "../extraFunctions";
import { fetchSpecial } from '../serverComunication';

import { useDispatch, useSelector } from 'react-redux';

import { changeLikeForSinglePost } from '../store/loadedPosts';


import { showCommentScreen } from '../store/commentWindow';

import TextWithReadMoreButton from "../TextWithReadMoreButtons";



export default function SinglePost({id, title, body, authorName, date, likeAmount, readingUser, isPostLikedByUser, isThisCommentPost}) {
    
    const dispatch = useDispatch();
    const loadedPosts = useSelector(state => state.loadedPosts);
    //dispatch(changePosts({posts:recentPosts}));

    const commentWindowVisibility = useSelector(state => state.commentWindow).visible;
    //alert(commentWindowVisibility);
    
    const [isPostInComments, setIsPostInComments] = useState(isThisCommentPost);

    const showComments = () => {
        if(!isPostInComments){
            dispatch(showCommentScreen());
        }else{
            alert("vajag nosktolot lejaa uz komentariem jo sis posts jau ir komentaa");
        }
        
       // alert(commentWindowVisibility);
    };



    const [postID, setPostID] = useState(id);
    const [currentUser, setcurrentUser] = useState(readingUser);
    const  likeCallback = async ()=>{
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
    
    
    
    
    
    return (
        <div className='SinglePost'>
            <div className='authorDateInfo'>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <img className="authorPic" src={require('../img/DefaultProfilePic.png')} ></img>
                    <div className="authorName">{authorName}</div>
                </div>
                <div className='dateInfoAboutPost'>{ExtraFunctions.getTimeAgo(date)}</div>
            </div>

            <div className='titleText'>{title}</div>
            <div className='postText'><TextWithReadMoreButton text={body}></TextWithReadMoreButton></div>

            <div className='likesAndComments'>
                <div onClick={()=>{likeCallback()}} style={{backgroundColor:(isPostLikedByUser ==1?"red":"white")}} className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{likeAmount}</div>
                <div className='comment' onClick={()=>{ showComments()  }}>Comment ...</div>
                <div className='ThreeDotIcon' ><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}