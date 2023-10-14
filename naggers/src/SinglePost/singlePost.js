import '../App.css';
import { useState } from 'react';
import "./singlePost.css";




export default function SinglePost({ title, body, authorName, date, likeAmount}) {
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
                <div className='likeIconAndCount'><img src={require('../img/like2.png')} className='likeComment'></img>{likeAmount}</div>
                <div className='comment'>Comment ...</div>
                <div className='ThreeDotIcon'><img src={require('../img/3Dots.png')} ></img></div>
            </div>
        </div>
    )
}


function getTimeAgo(dateTimeString) {
    const givenDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();
    const timeDifference = Math.floor((currentDateTime - givenDateTime) / 1000); // Convert to seconds
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