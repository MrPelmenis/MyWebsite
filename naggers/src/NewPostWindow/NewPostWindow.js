import '../App.css';
import { useState, useEffect } from 'react';
import './NewPostWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { hidePostScreen } from '../store/newPostWindow';


import logoPic from '../img/labsLogo.png';

import configData from "../config.json";

import { fetchSpecial } from '../serverComunication.js';



export default function NewPostWindow() {

    const dispatch = useDispatch();
    const newPostWindow = useSelector(state => state.newPostWindow);

    function handleClose() {
        dispatch(hidePostScreen());
    };


    //WYSIWYG editors tas ir eee takaa eeee fancy textbox



    if (newPostWindow.visible) {
        return (
            <div className="Container">
                <div className="white-box" style={{}}>
                    <div className="signUpPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>
                    </div>
                    <div className='newPostPart' style={{ textAlign: "center", height: 40, fontSize: 30, marginTop: -20 }}>New Post</div>
                    <div className="postInputHolder" style={{ height: "100%", width: "80%", margin: "auto" }}>
                        <input type='text' placeholder='Title' className='TitleInput'></input>
                        <textarea type='text' placeholder='Your Thoughts...' className='PostTextInput'></textarea>
                        <button className='postButton'>Post</button>
                    </div>


                </div>
            </div>
        );

    } else {
        return (
            <></>
        )
    }

};