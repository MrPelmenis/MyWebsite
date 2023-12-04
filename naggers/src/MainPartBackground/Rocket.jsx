import '../App.css';
import { useState } from 'react';
import "./MainPartBackground.css";
import React, { useEffect } from "react";





import MainPart from '../MainPart/mainPart';


export default function Rocket() {

    const [y, setY] = useState(Math.random()*200);

    useEffect(() => {
        const interval = setInterval(() => {
            setY(prevY => prevY + 0);
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    return (
        <span key={Math.random()*100 + "a"} style={{position:"absolute", top:(y)}}>aaaaaaaaaa</span>
    )
}