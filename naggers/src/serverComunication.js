import './App.css';
import { useState } from 'react';
import React from 'react';

import configData from "./config.json";

export async function fetchSpecial(request, variables) {
    const options = {
        method: 'POST',
        headers: {
            JWT: localStorage.getItem("JWT")
        },
        body: JSON.stringify(variables),
    };

    let res;

    fetch(configData.SERVER_URL + "/index.php?" + request, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            res = response;
        });

    return res;
}

