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

    if (newPostWindow.visible) {
        return (
            <div className="Container">
                <div className="white-box" style={{}}>
                    <div className="signUpPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>

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






/*<div className="white-box">
                    <div className="close-button" onClick={handleClose}>
                        X
                    </div>
                    <div className="topPart">
                        <img className='signInPic' src={logoPic}></img>
                        <div className="signinText">Sign In</div>
                    </div>

                    <div className="inputDiv">
                        <input type="text" placeholder="Nickname" className="signInInput"></input>
                        <input type="password" placeholder="Password" className="signInInput"></input>
                    </div>
                </div>*/