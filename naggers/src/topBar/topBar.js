import '../App.css';
import { useState } from 'react';
import './topBar.css';

import logo from "../img/logotranp.png";



export default function TopBar() {
    return (
        <div className="TopBar">
            <TopBarLeftSide />
            <TopBarRightSide />
        </div>
    )
}



function TopBarItem({ value }) {
    return (
        <div className="TopBarItem">
            {value}
        </div>
    )
}

function TopBarImg({ src, style }) {
    return (
        <img className="TopBarImg" style={style} alt={"a"} src={src}></img>
    )
}



function TopBarLeftSide() {
    return (
        <div className="TopBarLSide">
            <TopBarImg style={{ width: 90, height: 90 }} src={logo}> </TopBarImg>
        </div>
    )
}



function TopBarRightSide() {
    return (
        <div className="TopBarRSide">
        </div>
    )
}
