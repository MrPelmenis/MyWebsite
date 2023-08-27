import '../App.css';
import { useState } from 'react';
import './topBar.css';




import logo from "../img/logotranp.png";


import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import { showScreen, hideScreen } from '../store/signInWindow';







export default function TopBar() {
    return (
        <div className="TopBar">
            <TopBarLeftSide></TopBarLeftSide>
            <TopBarRightSide>
            </TopBarRightSide>
        </div >
    )

}



function SingInButton({ value }) {
    const dispatch = useDispatch();

    return (
        <button className="SingInButton" onClick={() => dispatch(showScreen())}>
            {value}
        </button>
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
            <Provider store={store}>
                <SingInButton value={"Sign In"}></SingInButton>
            </Provider>
        </div>
    )
}
