import '../App.css';
import { useState } from 'react';
import "./MainPartBackground.css";
import React, { useEffect, useRef } from "react";

import Rocket from './Rocket';



import MainPart from '../MainPart/mainPart';


export default function MainPartBackground() {
    const [rockets, setRockets] = useState([<Rocket key={Math.random()} />]);

    useEffect(() => {
        setTimeout(() => {
            if(rockets.length< 2){
                setRockets(prevRockets => [...prevRockets, <Rocket key={Math.random()} />]);
            }
        }, 1000);
    }, [rockets]);


    return (
        <div style={{position:"relative"}} className='MainPartBackground' > 
            {(rockets)}
            <MainPart></MainPart>
        </div>
    )
}