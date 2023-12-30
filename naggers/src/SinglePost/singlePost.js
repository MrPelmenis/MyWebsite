import '../App.css';
import { useState } from 'react';
import "./singlePost.css";
import { fetchSpecial } from '../serverComunication';
import { useDispatch, useSelector } from 'react-redux';
import { changeLikeForSinglePost } from '../store/loadedPosts';
import { showCommentScreen } from '../store/commentWindow';
import TextWithReadMoreButton from "../TextWithReadMoreButtons";
import configData from "../config.json";


import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { MdOutlineMore } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";

import { changeHelpText} from '../store/commentWindow';

import { ExtraFunctions } from '../extraFunctions';
import { width } from '@mui/system';



export default function SinglePost({id, title, body, authorName, date, likeAmount, readingUser, isPostLikedByUser, isThisCommentPost}) {

    const dispatch = useDispatch();
    const loadedPosts = useSelector(state => state.loadedPosts);
    const [readyBody, setReadyBody]  = useState(body);
    //dispatch(changePosts({posts:recentPosts}));
    const commentWindowVisibility = useSelector(state => state.commentWindow).visible;
    //alert(commentWindowVisibility);
    
    const [isPostInComments, setIsPostInComments] = useState(isThisCommentPost);
    const [postAuthorName, setPostAuthorName] = useState(authorName);
    const showComments = () => {
        if(!isPostInComments){
            dispatch(changeHelpText({helpText:""}));
            dispatch(showCommentScreen({authorName:authorName, isPostLikedByUser:isPostLikedByUser, uploadDate: date, title:title, body:readyBody, likeAmount:likeAmount, postID:id}));
        }        
    };
    const [postID, setPostID] = useState(id);
    const [currentUser, setcurrentUser] = useState(readingUser);
    const  likeCallback = async ()=>{
        if(!isPostInComments){
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
                ExtraFunctions.googleLogin();
            }
        }
    }


    const correctLikeCommentButtons= ()=>{
        if(!isPostInComments){
           return (<div className='likesAndComments'>
            <div style={{display:"flex"}}>
                <div className='likeIconAndCount notCommentPost' onClick={()=>{likeCallback()}} >
                    {isPostLikedByUser != 1 ? (<AiOutlineLike style={{ width:"25px", height:"25px" }}/>) : (<AiFillLike style={{ width:"25px", height:"25px" }}/>)}
                    <span style={{margin:"auto"}}>{likeAmount}</span>
                </div>
                <div style={{marginRight:10}}>|</div>
    
                <div className='comment' onClick={()=>{ showComments()  }}><AiOutlineComment  style={{marginLeft:"15px",paddingRight:"15px", width:"25px", height:"25px"}}/></div>
            </div>
        </div>)
        }else{
            return (<div className='likeIconAndCount' style={{marginLeft:10}} onClick={()=>{likeCallback()}} >
                {isPostLikedByUser != 1 ? (<AiOutlineLike style={{ width:"25px", height:"25px" }}/>) : (<AiFillLike style={{ width:"25px", height:"25px" }}/>)}
                <span style={{margin:"auto"}}>{likeAmount}</span>

                
        </div>)
        }
    }


    return (
        <div className='SinglePost'>
            <div className='authorDateInfo'>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <img className="authorPic" src={`${configData.SERVER_URL}/index.php?requestAnonymus=getProfilePictureForUser&clientName=${postAuthorName}`} ></img>
                    <div className="authorName">{authorName}</div>
                </div>
                <div className='dateInfoAboutPost' >{ExtraFunctions.getTimeAgo(date)}</div>
            </div>
            <div className='titleText'>{title}</div>
            <div className='postText'><TextWithReadMoreButton text={readyBody}></TextWithReadMoreButton></div>

            <div style={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                {correctLikeCommentButtons()}
                <HiddenEditDelteButtons showMe={(authorName == currentUser && !isPostInComments)}/>
            </div>

        </div>
    )
}


function HiddenEditDelteButtons({showMe}){
    const [showMyself, setShowMyself] = useState(showMe);
    const [show, setShow] = useState(false);

    const correctEditDeleteButtons = () => {
        return (<div className='editAndDelete'>
                <div className='comment' onClick={()=>{alert("edit")}} >
                    <MdEdit style={{ width:"25px", height:"25px" }}/>
                </div>

                <span>|</span>
    
                <div className='comment' onClick={()=>{ alert("delete")  }}>
                    <MdDelete  style={{width:"25px", height:"25px"}}/>
                </div>
            </div>)
    }



    if(showMe){
        if(!show){
            return(
                <div onClick={()=>setShow(!show)} className='hiddenEditDelete'><MdMoreHoriz  style={{width:25,height: 25, margin:"auto"}}/></div>
            )
        }else{
            return(
                <div className='editDeleteHidecontainer'>
                    {correctEditDeleteButtons()}
                    <div onClick={()=>setShow(!show)} className='hiddenEditDelete'><MdOutlineNavigateBefore  style={{width:25,height: 25, margin:"auto"}}/></div>
                </div>
            )
        }
    }else{
        return <></>;
    }

}