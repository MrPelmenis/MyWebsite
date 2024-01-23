import '../App.css';
import { useState, useEffect } from 'react';
import './ChangeNameWindow.css';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { hideChangeNameScreen } from '../store/changeNameWindow';

import { fetchSpecial } from '../serverComunication.js';

import logoPic from '../img/labsLogo.png';

import { changeHelpText } from '../store/changeNameWindow';



export default function ChangeNameWindow() {

    const dispatch = useDispatch();
    const changeNameWindow = useSelector(state => state.changeNameWindow);
    const navigate = useNavigate();
    const handleClose = () => {
       dispatch(changeHelpText({helpText:"What's the name you want now?"}));
       dispatch(hideChangeNameScreen());
    };

    const [nicknameInput, setNicknameInput] = useState('');
    const [updatednicknameInput, setUpdatednicknameInput] = useState(nicknameInput);

    const handleNickChange = (event) => {
        setNicknameInput(event.target.value);
    };

    const handleClick = async () => {
        setUpdatednicknameInput(nicknameInput);
        if (nicknameInput == "") {
            dispatch(changeHelpText({helpText:"You must type something..."}));
        } else {
            let allowedChars = [
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'," "
            ];
            
            for(let i=0;i<nicknameInput.length; i++){
                console.log(nicknameInput[i]);
                if(allowedChars.indexOf(nicknameInput[i]) == -1){
                    dispatch(changeHelpText({helpText:'Please use standart English letters and numbers only'}));
                    return;
                }
            }

            const data = await fetchSpecial("changeUserName", { nickname: nicknameInput });
            if (data.success) {
                handleClose();
                window.location.href="/";
                navigate("/profile");
                
            } else {
                dispatch(changeHelpText({helpText:'Username allready in use'}));
            }
        }
    };


    if (changeNameWindow.visible) {
        return (
            <div className="ChangeNameContainer">
                <div className="change-name-white-box">

                    <div className="signUpPart">
                        <div className="close-button" onClick={handleClose}>
                            X
                        </div>
                    </div>


                    <div className="changeNamePart" style={{ height: 80, marginTop: 0, display: "flex", justifyContent: 'center' }}><img className='changeNamePic' src={logoPic}></img></div>
                    <div className="changeNamePart" style={{ marginBottom: "5%" }}><div className='signUpText' style={{ display: "flex", justifyContent: 'center' }}>Change Username</div></div>


                    <div className="signUpPart" style={{ height: 80 }}>
                        <div className="inputDiv">
                            <input type="text" placeholder="Nickname" onChange={handleNickChange} value={nicknameInput} className="changeNameInput"></input>
                            <div className="changeName-helperText">{changeNameWindow.helpText}</div>
                            <div className="changeNameButtonHolder"><button className='changeNameButton' onClick={handleClick}>Change</button></div>

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
