import '../App.css';
import { useState } from 'react';
import './topBar.css';




import logo from "../img/logotranp.png";



import { Provider, useDispatch } from 'react-redux';
import store from '../store';


import { showScreen } from '../store/signInWindow';
import { showPostScreen, changeHelpText } from '../store/newPostWindow';


import { useSelector } from 'react-redux';


import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { fetchSpecial } from "../serverComunication.js";

import { changeUser } from '../store/currentUser';

import { ExtraFunctions } from '../extraFunctions';


export default function TopBar() {
    return (
        <div className='topBarHolder'>
            <div className="TopBar">
                <TopBarLeftSide></TopBarLeftSide>
                <TopBarRightSide></TopBarRightSide>
            </div>
            <div className='gradient-blur'></div>
        </div>
    )
}


function ProfilePicOnTop() {
    const navigate = useNavigate();

    const currentUserState = useSelector(state => state.currentUser);

    const openProfile = () => {
        navigate("/profile");
    }

    return (
        <>
            <img onClick={openProfile} 
            src={`${window.websiteSetting.SERVER_URL}/index.php?requestAnonymus=getProfilePictureForUser&clientName=${currentUserState.name}`}
            className='profilePicOnTop'></img>
        </>
    )
}



function SignInButton({ value }) {
    const currentUserState = useSelector(state => state.currentUser);
    const dispatch = useDispatch();


    let currentUserName = currentUserState.name;
    if (ExtraFunctions.isUserLoggedIn() && !currentUserState.accountExists) {
        dispatch(showScreen());
    }



    document.addEventListener(
        "localDataStorage"
        , () => { console.log("local storage change") }
        , false
    );


    const googleAuth = () => {
        ExtraFunctions.googleLogin();
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

function TopBarImg({ src }) {
    const navigate = useNavigate();

    const openMain = () => {
        navigate("/");
    }

    return (
        <div className="HomeButton tooltip" alt="Home" onClick={openMain}> 
            <img onClick={openMain} className="TopBarImg" src={src}></img>
            <span className="hometooltiptext">Home</span>
         </div>
    )
}



function TopBarLeftSide() {
    return (
        <div className="TopBarLSide">
            <TopBarImg src={logo}> </TopBarImg>
        </div>
    )
}





function NewPostButton() {
    let dispatch = useDispatch();
    const newPostWindow = useSelector(state => state.newPostWindow);
    const navigate = useNavigate();
    const openNewPostWindow = () => {
        dispatch(changeHelpText({helpText:""}));
        dispatch(showPostScreen());
        navigate("/");
    }
    if (ExtraFunctions.isUserLoggedIn()) {
        return (
            <>
                <div className="NewPostButton tooltip" alt="New Post" onClick={openNewPostWindow}>+ <span className="tooltiptext">New Post</span></div>
            </>
        )
    } else {
        return (<></>)
    }
}



function TopBarRightSide() {
    return (
        <div className="TopBarRSide">
            <Provider store={store}>
                <NewPostButton></NewPostButton>
                <SignInButton value={"Sign In"}></SignInButton>
            </Provider>
        </div>
    )
}
