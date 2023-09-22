import '../App.css';
import { useState } from 'react';
import './topBar.css';




import logo from "../img/logotranp.png";



import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import { showScreen } from '../store/signInWindow';

import configData from "../config.json";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";


export default function TopBar() {
    return (
        <div className="TopBar">
            <TopBarLeftSide></TopBarLeftSide>
            CONFIG.JSON FAILA SITUACIJU SALABOT!!!
            <TopBarRightSide>
            </TopBarRightSide>
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

let signedIn = true;

function ProfilePicOnTop(){
    const navigate = useNavigate();

    const openProfile = () => {
        navigate("/profile");
    }

    return (
        <>
            <img  onClick={openProfile} src={require('../img/DefaultProfilePic.png')} className='profilePicOnTop'></img>
        </>
    )
}



function SingInButton({ value }) {
    const dispatch = useDispatch();

    const googleAuth = () => {
        googleLogin();
    }

    if(signedIn){
        return (
            <ProfilePicOnTop> </ProfilePicOnTop>
        )
    }else{
        return (
            <>
    
                <button className="SingInButton" onClick={() => dispatch(showScreen())}>
                    sign in smukais
                </button>
    
                <button className="SingInButton" onClick={() => googleAuth()}>
                    sign in google
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
                <SingInButton value={"Sign In"}></SingInButton>
            </Provider>
        </div>
    )
}
