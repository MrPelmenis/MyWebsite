import { useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import "./ProfileContainer.css";

import defaultProfilePic from '../../../img/DefaultProfilePic.png';

import { fetchSpecial } from '../../../serverComunication';


import { showChangeNameScreen } from './../../../store/changeNameWindow';

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

export default function ProfileContainer() {
    
    const dispatch = useDispatch();
    const currentUserState = useSelector(state => state.currentUser);

    const[profilePicSrc, setProfilePicSrc] = useState(defaultProfilePic);

    const navigate = useNavigate();
  
    const uploadImg = (event) => {
        let file = event.target.files[0];
        console.log(file);
        //pretty much getting an image src from the uploaded file and sending it to the server
        if (file) {
            let data = new FormData();
            data.append('file', file);
            
            const reader = new FileReader();
            reader.onload = async () => {
              const img = new Image();
              img.src = reader.result;
            
              img.onload = async() => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                console.log("img params: W:" + img.width + " H: " + img.height);


                // Set canvas dimensions to resize the image
                let width = 500;
                let height = 500;

                canvas.width = width;
                canvas.height = height;


                let xOffset = 0;
                let yOffset = 0;

                // Check the aspect ratio of the image
                if (img.width <= img.height) {
                    width = Math.round((img.width / img.height) * height);
                    xOffset = (height - width)/2;
                } else {
                    height = Math.round((img.height / img.width) * width);
                    yOffset = (width - height)/2;
                }
//
                console.log("image stuff:");
                console.log("width: " + width);
                console.log("height: " + height);


                ctx.fillStyle = "white";
                ctx.fillRect(0,0,canvas.width,canvas.height);
                // Draw the image on the canvas and resize it
                ctx.drawImage(img, xOffset, yOffset, width, height);
            
                // Get the resized image as a data URL
                const resizedDataUrl = canvas.toDataURL('image/jpeg'); // Change 'image/jpeg' to desired format
            
                console.log(resizedDataUrl);
                setProfilePicSrc(resizedDataUrl);
            
                let res = await fetchSpecial("profileImgUpdate", { clientName: currentUserState.name, imgSrc: resizedDataUrl }, false);
                window.location.href = "/";
              };
            };
            reader.readAsDataURL(file);
        }
    }

    const openChangeNameWindow = () =>{
        dispatch(showChangeNameScreen());
    }


    const logoutCallback = ()=>{
        localStorage.setItem("JWT", "");
        window.location.href = "/";
        navigate("/profile");
    }
    
    return (
        <div className='ProfileContainer'>
            <div className='profileInfo'>
                <div style={{display:'flex'}}>
                    <img src={`${window.websiteSetting.SERVER_URL}/indexServer.php?requestAnonymus=getProfilePictureForUser&clientName=${currentUserState.name}`} className='ProfileImg'></img>
                    <input onChange={uploadImg} type="file" id="imgInput" accept="image/png, image/jpeg"/>
                    <label htmlFor="imgInput"><div className='editImgIcon'> &#9998;</div></label>
                </div>

                <div className='ProfileNameDisplay'>
                    {currentUserState.name}
                    <div onClick={()=>{openChangeNameWindow();}} className='changeUsernameButton'>Change your name &#9998;</div>
                </div>

                
            </div>
            <div onClick={()=>{logoutCallback()}} className='logOutButton'>
                 Log Out
            </div>
        </div>
    )
}