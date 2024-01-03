import '../App.css';
import { useState, useEffect } from 'react';
import './DeletePostWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';

import {hideDeleteScreen, changeDeletePost} from "../store/deletePostWindow";


import { fetchSpecial } from '../serverComunication.js';





export default function DeletePostWindow() {

    const dispatch = useDispatch();
    const deletePostWindow = useSelector(state => state.deletePostWindow);




    function handleClose() {
        dispatch(hideDeleteScreen());
    };


    async function deletePost(){          
        let res = await fetchSpecial("deletePost", {postID: deletePostWindow.PostId}, false);
        dispatch(hideDeleteScreen());
        window.location.href = "/";
    }

    if (deletePostWindow.visible) {
        return (
            <div className="Container">
                <div className="Delete-Post-white-box" >
                    <div className="editPostPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>
                    </div>
                    <div className='editPostPart' style={{ textAlign: "center", height: 40, fontSize: 30, marginTop: -20 }}>Remove Your Post</div>
                    <div className='areYouSure'>Are you sure? You worked so hard on it...</div>
                    <div className='cancel-delete-buttons'>
                        <button className='cancelButton' onClick={()=>{handleClose()}}>Cancel</button>
                        <button className='deleteButton' onClick={()=>{deletePost()}}>REMOVE</button>
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