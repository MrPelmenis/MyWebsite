import '../App.css';
import { useState } from 'react';
import './topBar.css';




import logo from "../img/logotranp.png";



import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import { showScreen } from '../store/signInWindow';
import { useSelector } from 'react-redux';


import configData from "../config.json";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { fetchSpecial } from "../serverComunication.js";

import { changeUser } from '../store/currentUser';

import { ExtraFunctions } from '../extraFunctions';


export default function TopBar() {
    return (
        <div className="TopBar">
            <TopBarLeftSide></TopBarLeftSide>
            <TopBarRightSide></TopBarRightSide>
        </div >
    )

}





function googleLogin() {
    let url =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `response_type=code&` +
        `client_id=${configData.CLIENT_ID}&` +
        `scope=openid%20email&` +
        `redirect_uri=${configData.REDIRECT_URL}&` +
        `nonce=0394852-3190485-2490358&`;
    window.location.href = url;
}



function ProfilePicOnTop() {
    const navigate = useNavigate();

    const openProfile = () => {
        navigate("/profile");
    }

    return (
        <>
            <img onClick={openProfile} src={require('../img/DefaultProfilePic.png')} className='profilePicOnTop'></img>
        </>
    )
}



function SignInButton({ value }) {
    const currentUserState = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    let currentUserName = currentUserState.name;
    console.log(currentUserState.name);
    if (ExtraFunctions.isUserLoggedIn() && !currentUserState.accountExists) {
        dispatch(showScreen());
    }



    document.addEventListener(
        "localDataStorage"
        , () => { console.log("local storage change") }
        , false
    );


    const googleAuth = () => {
        googleLogin();
    }


    if (ExtraFunctions.isUserLoggedIn()) {
        return (
            <>
                <div className='profileDisplayOnTop'>
                    <ProfilePicOnTop> </ProfilePicOnTop>
                    <div style={{ color: "white" }}>{currentUserState.name}</div>
                </div>

            </>
        )
    } else {
        return (
            <>
                <button className="SignInButton" onClick={() => googleAuth()}>
                    Sign In
                </button>
            </>
        )
    }

}

function TopBarImg({ src, style }) {
    return (
        <img className="TopBarImg" style={style} alt={"a"} src={src}></img>
    )
}



function TopBarLeftSide() {
    return (
        <div className="TopBarLSide">
            <TopBarImg style={{ width: 90, height: 90 }} src={logo}> </TopBarImg>
        </div>
    )
}



function TopBarRightSide() {
    return (
        <div className="TopBarRSide">
            <Provider store={store}>
                <SignInButton value={"Sign In"}></SignInButton>
            </Provider>
        </div>
    )
}
