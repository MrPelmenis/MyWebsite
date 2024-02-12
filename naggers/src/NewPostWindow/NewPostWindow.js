import '../App.css';
import { useState, useEffect } from 'react';
import './NewPostWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { changeHelpText, hidePostScreen } from '../store/newPostWindow';

import { fetchSpecial } from '../serverComunication.js';


import { changePosts } from '../store/loadedPosts';



export default function NewPostWindow() {

    const dispatch = useDispatch();
    const newPostWindow = useSelector(state => state.newPostWindow);
    const loadedPosts = useSelector(state => state.loadedPosts);
    const currentUser = useSelector(state=>state.currentUser);

    function handleClose() {
        dispatch(hidePostScreen());
    };

    const [textInput, setTextInput] = useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
        if(textInput.length >= 5000){
            dispatch(changeHelpText({helpText:"Please don't make the body longer than 5000 characters"}));
        }
    };


    const [titleInput, setTitleInput] = useState('');
    const handleTitleInputChange = event => {
        setTitleInput (event.target.value);
        if(titleInput.length >= 100){
            dispatch(changeHelpText({helpText:"Please don't make the title longer than 100 characters"}));
        }
    };


    async function uploadPost (){
        if(titleInput != "" && textInput != ""){
            if(titleInput.length >= 100){
                dispatch(changeHelpText({helpText:"Please don't make the title longer than 100 characters"}));
                return;
            }
            if(textInput.length >= 5000){
                dispatch(changeHelpText({helpText:"Please don't make the body longer than 5000 characters"}));
                return;
            }

            let res = await fetchSpecial("uploadPost", { title: titleInput, body: textInput }, false);
            console.log(res);
            if(res.postID){
                let recentPost = ((await fetchSpecial("getRecentPosts", {clientName: currentUser.name, postID:res.postID}, (currentUser.name != "" ? false: true ))))[0];
                setTitleInput("");
                setTextInput("");
                dispatch(hidePostScreen());
                dispatch(changePosts({posts:[recentPost, ...loadedPosts.posts]}));
                dispatch(changeHelpText({helpText:""}));
            }
        }else{
            dispatch(changeHelpText({helpText:"You must enter something..."}));
            console.log(newPostWindow.helpText);
        }
    }

    ///////////////////////////////////////////////////////
    //WYSIWYG editors tas ir eee takaa eeee fancy textbox//
    ///////////////////////////////////////////////////////


    if (newPostWindow.visible) {
        return (
            <div className="Container">
                <div className="newPost-white-box" style={{}}>
                    <div className="newPostPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>
                    </div>
                    <div className='newPostPart' style={{ textAlign: "center", height: 40, fontSize: 30, marginTop: -20 }}>New Post</div>
                    <div className="postInputHolder" style={{width: "80%", margin: "auto" }}>
                        <input type='text' placeholder='Title' className='TitleInput'
                        onChange={handleTitleInputChange} value={titleInput}></input>

                        <textarea type='text' placeholder='Your Thoughts...' className='PostTextInput'
                        onChange={handleTextInputChange} value={textInput}></textarea>
                        <div className='newPosthelperText'>{newPostWindow.helpText}</div>
                    </div>
                    <button className='postButton' onClick={()=>{uploadPost()}}>Post</button>


                </div>
            </div>
        );

    } else {
        return (
            <></>
        )
    }

};