import '../App.css';
import { useState } from 'react';
import './SignInWindow.css';


import { useDispatch, useSelector } from 'react-redux';

import { hideScreen } from '../store/signInWindow';



import logoPic from '../img/labsLogo.png';


export default function SingInWindow() {

    const dispatch = useDispatch();
    const signInWindow = useSelector(state => state.signInWindow);
    console.log(signInWindow.visible);

    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        dispatch(hideScreen());
    };

    if (signInWindow.visible) {
        return (
            <div className="Container">
                <div className="white-box">
                    <div className="signInPart" style={{ height: 30 }}><div className="close-button" onClick={handleClose}>
                        X
                    </div></div>
                    <div className="signInPart" style={{ height: 80, display: "flex", justifyContent: 'center' }}><img className='signInPic' src={logoPic}></img></div>

                    <div className="signInPart"><div className='signInText' style={{ display: "flex", justifyContent: 'center' }}>Sign In</div></div>
                    <br />
                    <div className="signInPart" style={{ height: 80 }}>
                        <div className="inputDiv">
                            <input type="text" placeholder="Nickname" className="signInInput"></input>

                            <div className="forgotCredencials"><a href="http://localhost:3000/">Forgot nickname?</a></div>

                            <input type="password" placeholder="Password" className="signInInput"></input>

                            <div className="forgotCredencials"><a href="http://localhost:3000/">Forgot password?</a></div>

                            <div className="signInButtonHolder"><button className='signInButton'>Sign In</button></div>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="signInPart" style={{ textAlign: 'center' }}>Don't have an account yet? Click <a href="http://localhost:3000/">HERE</a> to sign up</div>

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