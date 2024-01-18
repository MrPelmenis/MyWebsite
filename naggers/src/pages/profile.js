import { Navigate, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProfileContainer from "./ProfilePageComponents/ProfileContainer/ProfileContainer.jsx";


import store from "../store";
import { Provider } from 'react-redux';

import ChangeNameWindow from './../ChangeNameWindow/ChangeNameWindow'; 

const Profile = () => {
    const navigate = useNavigate();
    useEffect(() => {
    });
    
    return (
        <Provider store={store}>
            <ChangeNameWindow></ChangeNameWindow>
            <ProfileContainer>
            </ProfileContainer>
        </Provider>
    )
};


export default Profile;