import '../App.css';
import { useState, useEffect } from 'react';
import './EditPostWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';

import {  hidePostEditScreen, editPostTitleBody, changeEditHelpText } from '../store/editPostWindow';


import logoPic from '../img/labsLogo.png';

import configData from "../config.json";

import { fetchSpecial } from '../serverComunication.js';


import { changePosts } from '../store/loadedPosts';
import { Co2Sharp } from '@mui/icons-material';




export default function EditPostWindow() {
    const dispatch = useDispatch();
    const editPostWindow = useSelector(state => state.editPostWindow);


    const newPostWindow = useSelector(state => state.newPostWindow);
    const loadedPosts = useSelector(state => state.loadedPosts);
    const currentUser = useSelector(state=>state.currentUser);

    function handleClose() {
        dispatch(hidePostEditScreen());
    };
    
    const handleTextInputChange = event => {
        dispatch(editPostTitleBody({title:editPostWindow.title, body:event.target.value,  postID: editPostWindow.postID}));
    };

    const handleTitleInputChange = event => {
        dispatch(editPostTitleBody({title:event.target.value, body:editPostWindow.body, postID: editPostWindow.postID}));
    };


    const updatePost = async () =>{
        if(editPostWindow.title != "" && editPostWindow.body != ""){
            let res = await fetchSpecial("updatePost", {postID: editPostWindow.postID, title: editPostWindow.title, body:editPostWindow.body}, false);
            dispatch(hidePostEditScreen());
            window.location.href = "/";
        }else{
            dispatch(changeEditHelpText({helpText:"You must type something..."}));
        }
        
    }


    if (editPostWindow.visible) {
        return (
            <div className="Container">
                <div className="Edit-Post-white-box" style={{}}>
                    <div className="editPostPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>
                    </div>
                    <div className='editPostPart' style={{ textAlign: "center", height: 40, fontSize: 30, marginTop: -20 }}>Edit Your Post</div>

                    <div className="postInputHolder" style={{width: "80%", margin: "auto" }}>
                        <input type='text' placeholder='Title' className='TitleInput'
                        onChange={handleTitleInputChange} value={editPostWindow.title}></input>

                        <textarea type='text' placeholder='Your Thoughts...' className='PostTextInput'
                        onChange={handleTextInputChange} value={editPostWindow.body}></textarea>
                        <div className='newPosthelperText'>{editPostWindow.helpText}</div>
                    </div>


                    <button className='postButton' onClick={()=>{updatePost()}}>Change</button>
                </div>
            </div>
        );

    } else {
        return (
            <></>
        )
    }

};