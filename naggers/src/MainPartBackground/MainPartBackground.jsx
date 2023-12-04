import '../App.css';
import { useState } from 'react';
import "./MainPartBackground.css";
import React, { useEffect } from "react";

import Rocket from './Rocket';



import MainPart from '../MainPart/mainPart';


export default function MainPartBackground() {
    const [rockets, setRockets] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            if(rockets.length< 3){
                setRockets(prevRockets => [...prevRockets, <Rocket key={Math.random()} />]);
            }
        }, 5000);
    }, [rockets]);


    return (
        <div style={{position:"relative"}} className='MainPartBackground'>
            {(rockets)}
            <MainPart></MainPart>
        </div>
    )
}