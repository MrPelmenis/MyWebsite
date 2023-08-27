import '../App.css';
import { useState } from 'react';
import './SignInWindow.css';


import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../store';

import signInWindow, { showScreen, hideScreen } from '../store/signInWindow';


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
            <div className="Container" >
                <div className="sing-in-window">
                    <div className="white-box">
                        <div className="close-button" onClick={handleClose}>
                            X
                        </div>
                        <h1>Sign In</h1>
                        <button className="sign-in-button" >
                            Sign In
                        </button>
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
