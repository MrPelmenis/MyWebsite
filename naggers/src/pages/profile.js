import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import configData from "../config.json";


const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 1000);

    });

    return (
        <>
            <div style={{ marginTop: 300, fontSize: 50, width: 500, height: 500 }}>Luuk Tavs PRofils</div>
        </>
    )
};


export default Profile;