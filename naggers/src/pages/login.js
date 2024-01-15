import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import configData from "../config.json";

import { ExtraFunctions } from "../extraFunctions";

const Login = () => {
    const navigate = useNavigate();

     useEffect(() => {
        callback();

    });

    return (
        <>
            <div style={{ marginTop: 300, fontSize: 50, width: 500, height: 500 }}>Loading...</div>
        </>
    )
};


async function callback() {
    if(!ExtraFunctions.isUserLoggedIn()){
        const url = new URL(window.location.href);
        let code = url.searchParams.get('code');
        console.log(code);
    
    
        let response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'code': code,
                'client_id': configData.CLIENT_ID,
                'client_secret': configData.CLIENT_SECRET,
                'redirect_uri': configData.REDIRECT_URL,
                'grant_type': 'authorization_code'
            })
        });
    
        var result = await response.json();
    
        console.log('response:');
        console.log(result);

        localStorage.setItem("JWT", JSON.stringify(result));
        let jtoken = (localStorage.getItem("JWT"));
        console.log("tokenFromStorage:");
        console.log(jtoken);

        window.location.href = "/";
        
    }
}

export default Login;
