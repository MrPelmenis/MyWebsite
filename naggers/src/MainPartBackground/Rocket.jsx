import '../App.css';
import { useState } from 'react';
import "./MainPartBackground.css";
import React, { useEffect } from "react";




import { MdOutlineRocketLaunch } from "react-icons/md";
import MainPart from '../MainPart/mainPart';


export default function Rocket() {

    const [y, setY] = useState(Math.random() * window.screen.height);

    const [x, setX] = useState(Math.random() * window.screen.width );

    const [speed, setSpeed] = useState(1);

    const [angle, setAngle] = useState(2 * Math.PI * Math.random());

        
    useEffect(() => {
        const interval = setInterval(() => {
            setAngle(prevAngle => (prevAngle += (Math.random() * 5 - 2) * (Math.PI / 180)));
        }, 10);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        setY(prevY => prevY + Math.sin(angle - Math.PI / 4) * speed);
        setX(prevX => prevX + Math.cos(angle - Math.PI / 4) * speed);

    }, [angle, speed]);


    return (
        <span key={Math.random()*100 + "a"} style={{position:"absolute",userSelect:"none", fontSize:"30px", top:(y), left:(x), transform: `rotate(${angle}rad)`}}><MdOutlineRocketLaunch/></span>
    )
}