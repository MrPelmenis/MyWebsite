import { Navigate, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProfileContainer from "./ProfilePageComponents/ProfileContainer/ProfileContainer.jsx";

import configData from "../config.json";

import store from "../store";
import { Provider } from 'react-redux';

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
            <ProfileContainer>
                <button onClick={logOut}>Log Out</button>
            </ProfileContainer>
        </Provider>
    )
};


export default Profile;