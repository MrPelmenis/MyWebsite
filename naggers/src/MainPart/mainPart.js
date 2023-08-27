import '../App.css';
import { useState } from 'react';
import "./mainPart.css";
import SinglePost from '../SinglePost/singlePost';
import React, { useEffect } from "react";

export default function MainPart() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const mainPartWidth = width < 900 ? "100%" : "60%";

    return (
        <div className='MainPart' style={{ width: mainPartWidth }}>
            <SinglePost value="aaa"></SinglePost>
        </div>
    )
}