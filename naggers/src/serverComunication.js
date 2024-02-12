import './App.css';
import { useState } from 'react';
import React from 'react';



export async function fetchSpecial(request, variables, isUserAnonymus = false) {
    let argument;
    if (isUserAnonymus) {
        argument = "requestAnonymus";
    } else {
        argument = "request";
    }

    var formData = new FormData();

    Object.entries(variables).forEach(entry => {
        const [key, value] = entry;
        formData.append(key, value);
    });

    const options = {
        method: 'POST',
        headers: {
            JWT: isUserAnonymus ? "" : localStorage.getItem("JWT")
        },
        body: formData,
    };

    let res = await fetch(`${window.websiteSetting.SERVER_URL}/indexServer.php?${argument}=${request}`, options);
    let finalResult = await res.json();
    
    return finalResult;
}
