import { useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import "./ProfileContainer.css";

import defaultProfilePic from '../../../img/DefaultProfilePic.png';

import { fetchSpecial } from '../../../serverComunication';

import configData from "../../../config.json";

export default function ProfileContainer() {
    
    const dispatch = useDispatch();
    const currentUserState = useSelector(state => state.currentUser);

    const[profilePicSrc, setProfilePicSrc] = useState(defaultProfilePic);
  
    const uploadImg = (event) => {
        let file = event.target.files[0];
        console.log(file);
        //pretty much getting an image src from the uploaded file and sending it to the server
        if (file) {
          let data = new FormData();
          data.append('file', file);
           
          const reader = new FileReader();
           reader.onload = async ()=>{
                console.log(reader.result);
                setProfilePicSrc(reader.result);
                let res = await fetchSpecial("profileImgUpdate", {clientName: currentUserState.name, imgSrc: reader.result}, false);
                console.log(res);
                window.location.href="/profile";
           } 
           reader.readAsDataURL(file);
          
        }
    }

    
    

    
    return (
        <div className='ProfileContainer'>
            <div style={{display:"flex", justifyContent:"left"}}>
                <img src={`${configData.SERVER_URL}/index.php?requestAnonymus=getProfilePictureForUser&clientName=${currentUserState.name}`} className='ProfileImg'></img>
                
                <input onChange={uploadImg} type="file" id="imgInput" accept="image/png, image/jpeg"/>
                <label htmlFor="imgInput"><div className='editImgIcon'> &#9998;</div></label>

                <div className='ProfileNameDisplay'>
                    {currentUserState.name}
                    <div className='changeUsernameButton'>Change your name &#9998;</div>
                </div>
            </div>
        </div>
    )
}