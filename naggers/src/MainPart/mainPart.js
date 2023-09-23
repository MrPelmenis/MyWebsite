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
            <SinglePost value="ittle Red Riding Hood skipped away. She followed the twisty path and jumped over the puddles untit the other She followed the twisty path and jumped over the puddles untit the other end of Long-LostShe followed the twisty path and jumped over the puddles untit the other end of Long-LostShe followed the twisty path and jumped over the puddles untit the other end of Long-Lostend of Long-Lost Wood, in the cottage with a green door.” At that moment an owl hooted and the"></SinglePost>
        </div>
    )
}