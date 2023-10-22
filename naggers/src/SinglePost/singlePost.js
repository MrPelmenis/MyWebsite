import '../App.css';
import { useState } from 'react';
import "./singlePost.css";

import { ExtraFunctions } from "../extraFunctions";
import { fetchSpecial } from '../serverComunication';

import { useDispatch, useSelector } from 'react-redux';

import { changeLikeForSinglePost } from '../store/loadedPosts';



export default function SinglePost({id, title, body, authorName, date, likeAmount, readingUser, isPostLikedByUser}) {
    
    const dispatch = useDispatch();
    const loadedPosts = useSelector(state => state.loadedPosts);
    //dispatch(changePosts({posts:recentPosts}));

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
                <div className='dateInfoAboutPost'>{getTimeAgo(date)}</div>
            </div>

            <div className='titleText'>{title}</div>
            <div className='postText'><TextWithReadMoreButton text={body}></TextWithReadMoreButton></div>

            <div className='likesAndComments'>
                <div onClick={()=>{likeCallback()}} style={{backgroundColor:(isPostLikedByUser ==1?"red":"white")}} className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{likeAmount}</div>
                <div className='comment'>Comment ...</div>
                <div className='ThreeDotIcon' ><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}

function convertUTCtoLocal(utcDate) {
    var localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);
    return localDate;
  }

function getTimeAgo(dateTimeString) {
    let givenDateTime = new Date(dateTimeString)
    givenDateTime = convertUTCtoLocal(givenDateTime);
    const currentDateTime = new Date();
   // console.log("no servera: " + givenDateTime);
   // console.log("tagad ir: " +  currentDateTime);
    const timeDifference = Math.floor((currentDateTime - givenDateTime) / 1000); // Convert to seconds
    //console.log("seconds: " + timeDifference);
    if (timeDifference < 60) {
      return timeDifference + " seconds ago";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return minutes + " minutes ago";
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return hours + " hours ago";
    } else {
      const days = Math.floor(timeDifference / 86400);
      return days + " days ago";
    }
  }


function TextWithReadMoreButton(props) {

    const maxTextLength = 200;


    const [maxLength, setLength] = useState(maxTextLength);


    const textShortener = (inputText, maxLength) => {
        if (maxLength == -1) {
            return inputText;
        } else {
            return inputText.substring(0, maxLength) + "...";
        }
    }

    const changeLength = () => {
        if (maxLength == -1) {
            setLength(maxTextLength);
        } else {
            setLength(-1);
        }

    }

    const buttonChecker = () => {
        if (props.text.length > maxTextLength) {
            return (<button className='readMoreOrLess' onClick={() => changeLength()}>{maxLength == -1 ? "Read Less" : "Read More"}</button>)
        }
    }

    return (
        <div>{textShortener(props.text, maxLength)}  {buttonChecker()}</div>
    );
}