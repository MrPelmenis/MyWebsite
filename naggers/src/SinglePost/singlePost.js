import '../App.css';
import { useState } from 'react';
import "./singlePost.css";




export default function SinglePost({ value }) {
    return (
        <div className='SinglePost'>
            <div className='authorDateInfo'>
                <div style={{display:"flex", justifyContent: "left"}}>
                    <img className="authorPic"  src={require('../img/DefaultProfilePic.png')} ></img>
                    <div className="authorName">Autors</div>  
                </div>
                <div className='dateInfoAboutPost'>17th March</div>
            </div>

            <div className='postText'><TextWithReadMoreButton text={value}></TextWithReadMoreButton></div>

            <div className='likesAndComments'>
                <img src={require('../img/likeIcon.png')} className='likeComment'></img>
                <img src={require('../img/comment.png')} className='likeComment'></img>
                <img src='likeIcon.png' className='likeComment'></img>
            </div>
        </div>
    )
}



function TextWithReadMoreButton(props){

    const maxTextLength = 200;


    const [maxLength, setLength] = useState(maxTextLength);


    const textShortener = (inputText, maxLength)=>{
        if(maxLength == -1){
            return inputText;
        }else{
            return inputText.substring(0, maxLength) + "...";
        }
    }

    const changeLength = ()=>{
        if(maxLength == -1){
            setLength(maxTextLength);
        }else{
            setLength(-1);
        }
        
    }   

    const buttonChecker = () =>{
        if(props.text.length > maxTextLength){
            return (<button className='readMoreOrLess' onClick={() => changeLength()}>{maxLength == -1 ? "Read Less" : "Read More"}</button>)
        }
    }

        return (
        <div>{textShortener(props.text, maxLength)}  {buttonChecker()}</div>
        );
}