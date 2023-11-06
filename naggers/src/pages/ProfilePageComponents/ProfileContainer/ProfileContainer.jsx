import { useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import "./ProfileContainer.css";

import defaultProfilePic from '../../../img/DefaultProfilePic.png';

export default function ProfileContainer() {
    
    const dispatch = useDispatch();
    const currentUserState = useSelector(state => state.currentUser);

    const[profilePicSrc, setProfilePicSrc] = useState(defaultProfilePic);
  
    const uploadImg = (event) => {
        let file = event.target.files[0];
        console.log(file);
        
        if (file) {
          let data = new FormData();
          data.append('file', file);
           
          const reader = new FileReader();
           reader.onload = ()=>{
            alert("aaa");
            setProfilePicSrc(reader.result);
           } 
           reader.readAsDataURL(file);
          
        }
    }

    
    //dispatch(changePosts({posts:recentPosts}));

    
    return (
        <div className='ProfileContainer'>
            <div style={{display:"flex", justifyContent:"left"}}>
                <img  src={profilePicSrc} className='ProfileImg'></img>
                
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