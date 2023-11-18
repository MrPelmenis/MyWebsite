import { Navigate, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProfileContainer from "./ProfilePageComponents/ProfileContainer/ProfileContainer.jsx";

import configData from "../config.json";

import store from "../store";
import { Provider } from 'react-redux';

import ChangeNameWindow from './../ChangeNameWindow/ChangeNameWindow';

import { showChangeNameScreen } from '../store/changeNameWindow';

const Profile = () => {
    const navigate = useNavigate();
    

    useEffect(() => {
    });

    const logOut = () => {
        localStorage.setItem("JWT", "");
        window.location.href = "/";
    }

    return (
        <Provider store={store}>
            <ChangeNameWindow></ChangeNameWindow>
            <ProfileContainer>
                <button onClick={logOut}>Log Out</button>
            </ProfileContainer>
        </Provider>
    )
};


export default Profile;