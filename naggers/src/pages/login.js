import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import configData from "../config.json";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        callback();
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);

    });

    return (
        <>
            <div style={{ marginTop: 300, fontSize: 50, width: 500, height: 500 }}>tu gejs</div>
        </>
    )
};


async function callback() {
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

    const JWTToken = parseJwt(result.id_token);


    console.log("Token:");
    console.log(JWTToken);

    localStorage.setItem("JWT", JSON.stringify(JWTToken));
    let jtoken = JSON.parse(localStorage.getItem("JWT"));
    console.log("from   storage jwt:");
    console.log(jtoken);





}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


export default Login;
