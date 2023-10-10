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

    const [whiteWidth, setWhiteWidth] = useState("35%");
    const [whiteHeight, setWhiteHeight] = useState("35%");

    const[inputHeight, setInputHeight] = useState("100px");
    
    const handleResize = () => {
        console.log("resize");
        if (window.innerWidth < 900 || window.innerHeight < 900) {
            setWhiteWidth("75%");
            setWhiteHeight("75%");
        } else {
            setWhiteWidth("80%");
            setWhiteHeight("80%");
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (newPostWindow.visible) {
        return (
            <div className="Container">
                <div className="white-box" style={{width:whiteWidth, height:whiteHeight}}>
                    <div className="signUpPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>
                        <div className='newPostPart' style={{textAlign:"center", height:40, fontSize:30,marginTop:-20}}>New Post</div>
                        <div className="postInputHolder" style={{height: inputHeight,width:"80%", margin:"auto"}}>
                            <input type='text' placeholder='Title' className='TitleInput'></input>
                            <textarea type='text' placeholder='Your Thoughts...' className='PostTextInput'></textarea>
                        </div>
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