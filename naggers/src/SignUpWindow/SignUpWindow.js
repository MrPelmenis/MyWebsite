import '../App.css';
import { useState, useEffect } from 'react';
import './SignUpWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../store/currentUser';

import { hideScreen } from '../store/signInWindow';




import logoPic from '../img/labsLogo.png';


import configData from "../config.json";


import { fetchSpecial } from '../serverComunication.js';



export default function SingUpWindow() {

    const dispatch = useDispatch();
    const signInWindow = useSelector(state => state.signInWindow);

    const handleClose = () => {
        dispatch(hideScreen());
        localStorage.setItem("JWT", "");
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

            let allowedChars = [
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'," ",
            ];
            
            for(let i=0;i<nicknameInput.length; i++){
                console.log(nicknameInput[i]);
                if(allowedChars.indexOf(nicknameInput[i]) == -1){
                    setHelperText('Cannot use symbols such as ' + nicknameInput[i] + ', #, $...');
                    return;
                }
            }
            
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

    if (signInWindow.visible) {
        return (
            <div className="Container">
                <div className="sign-up-white-box">
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
                            <div className="signUpHelperText">{helperText}</div>
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