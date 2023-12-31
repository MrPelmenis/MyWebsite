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

import configData from "../config.json";


export default function TopBar() {
    return (
        <div className="TopBar">
            <TopBarLeftSide></TopBarLeftSide>
            <TopBarRightSide></TopBarRightSide>
        </div >
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
            src={`${configData.SERVER_URL}/index.php?requestAnonymus=getProfilePictureForUser&clientName=${currentUserState.name}`}
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
        <img onClick={openMain} className="TopBarImg" src={src}></img>
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
    //dispatch(showPostScreen());

    const openNewPostWindow = () => {
        dispatch(changeHelpText({helpText:""}));
        dispatch(showPostScreen());
    }

    if (ExtraFunctions.isUserLoggedIn()) {
        return (
            <>
                <button className="NewPostButton" onClick={openNewPostWindow}>+</button>
            </>
        )
    } else {

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
