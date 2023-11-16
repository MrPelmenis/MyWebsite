import '../App.css';
import { useState, useEffect } from 'react';
import './changeNameWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';


import { hideScreen } from '../store/changeNameWindow';


import { fetchSpecial } from '../serverComunication.js';



export default function SingUpWindow() {

    const dispatch = useDispatch();
    const signInWindow = useSelector(state => state.signInWindow);

    const handleClose = () => {
        dispatch(hideScreen());
        localStorage.setItem("JWT", "");
        alert("logOut");
        window.location.href = "/";
    };


    const [nicknameInput, setNicknameInput] = useState('');
    const [updatednicknameInput, setUpdatednicknameInput] = useState(nicknameInput);

    const handleNickChange = (event) => {
        setNicknameInput(event.target.value);
    };

    const handleClick = async () => {
        setUpdatednicknameInput(nicknameInput);
        if (nicknameInput == "") {
            setHelperText("You cannot be named -");
        } else {
            const data = await fetchSpecial("nickNameUpdate", { nickname: nicknameInput });
            if (data.success) {
                dispatch(hideScreen());
                dispatch(changeUser({ name: nicknameInput, accountExists: true }));
            } else {
                setHelperText('userName allready in use');
            }
        }
    };

    const [helperText, setHelperText] = useState("What name do you want to be known by ?");



    const [whiteWidth, setWhiteWidth] = useState("35%");
    const [whiteHeight, setWhiteHeight] = useState("35%");

    const handleResize = () => {
        if (window.innerWidth < 900 || window.innerHeight < 900) {
            setWhiteWidth("75%");
            setWhiteHeight("75%");
        } else {
            setWhiteWidth("40%");
            setWhiteHeight("40%");
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (signInWindow.visible) {
        return (
            <div className="Container">
                <div className="white-box" style={{ width: whiteWidth, height: whiteHeight }}>
                    <div className="signUpPart" ><div className="close-button" onClick={handleClose}>
                        X
                    </div>

                    </div>
                    <div className="signUpPart" style={{ height: 80, marginTop: 0, display: "flex", justifyContent: 'center' }}><img className='signUpPic' src={logoPic}></img></div>

                    <div className="signUpPart" style={{ marginBottom: "5%" }}><div className='signUpText' style={{ display: "flex", justifyContent: 'center' }}>Sign Up</div></div>
                    <br />

                    <div className="signUpPart" style={{ height: 80 }}>
                        <div className="inputDiv">
                            <input type="text" placeholder="Nickname" onChange={handleNickChange} value={nicknameInput} className="signUpInput"></input>
                            <div className="helperText">{helperText}</div>
                            <div className="signInButtonHolder"><button className='signUpButton' onClick={handleClick}>Sign Up</button></div>

                        </div>
                    </div>


                </div>
            </div>
        );

    } else {
        return (
            <></>
        )
    }

};






/*<div className="white-box">
                    <div className="close-button" onClick={handleClose}>
                        X
                    </div>
                    <div className="topPart">
                        <img className='signInPic' src={logoPic}></img>
                        <div className="signinText">Sign In</div>
                    </div>

                    <div className="inputDiv">
                        <input type="text" placeholder="Nickname" className="signInInput"></input>
                        <input type="password" placeholder="Password" className="signInInput"></input>
                    </div>
                </div>*/