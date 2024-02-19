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
    const handleTextInputChange = (event => {
        const newValue = event.target.value;
        if (newValue.length < 5000) {
            setTextInput(newValue);
            dispatch(changeHelpText({helpText:""}));
        } else {
            dispatch(changeHelpText({helpText:"Please don't make the body longer than 5000 characters"}));
        }
    });


    const [titleInput, setTitleInput] = useState('');
    const handleTitleInputChange = event => {
        const newValue = event.target.value;
        if (newValue.length < 100) {
            setTitleInput(newValue);
            dispatch(changeHelpText({helpText:""}));
        } else {
            dispatch(changeHelpText({helpText:"Please don't make the title longer than 100 characters"}));
        }
    };


    const handleTitlePaste = event => {
        const pastedText = event.clipboardData.getData('text');
        if(pastedText.length + titleInput.length > 100){
            dispatch(changeHelpText({helpText:"Please don't make the title longer than 100 characters"}));
        }
    };


    const handleBodyPaste = event => {
        const pastedText = event.clipboardData.getData('text');
        console.log(pastedText.length + textInput.length + 2);
        if(pastedText.length + textInput.length + 2 > 5000){
            dispatch(changeHelpText({helpText:"Please don't make the body longer than 5000 characters"}));
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
                        <input type='text' maxLength="100" onPaste={handleTitlePaste} placeholder='Title' className='TitleInput'
                        onChange={handleTitleInputChange} value={titleInput}></input>


                        <textarea type='text' maxLength="5000" placeholder='Your Thoughts...' className='PostTextInput'
                        onChange={handleTextInputChange} onPaste={handleBodyPaste}value={textInput}></textarea>
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