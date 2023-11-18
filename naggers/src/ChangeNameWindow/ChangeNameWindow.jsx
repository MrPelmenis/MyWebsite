import '../App.css';
import { useState, useEffect } from 'react';
import './ChangeNameWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';


import { hideChangeNameScreen } from '../store/changeNameWindow';


import { fetchSpecial } from '../serverComunication.js';

import logoPic from '../img/labsLogo.png';


export default function ChangeNameWindow() {

    const dispatch = useDispatch();
    const changeNameWindow = useSelector(state => state.changeNameWindow);

    const handleClose = () => {
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
            setHelperText("You cannot be named -");
        } else {
            const data = await fetchSpecial("changeUserName", { nickname: nicknameInput });
            if (data.success) {
                handleClose();
                window.location.href="./profile";
            } else {
                setHelperText('Username allready in use');
            }
        }
    };

    const [helperText, setHelperText] = useState("What's the name you want now?");



   
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
                            <div className="helperText">{helperText}</div>
                            <div className="changeNameButtonHolder"><button className='signUpButton' onClick={handleClick}>Change</button></div>

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
