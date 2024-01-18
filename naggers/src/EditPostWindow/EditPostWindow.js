import '../App.css';
import { useState, useEffect } from 'react';
import './EditPostWindow.css';
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';

import {  hidePostEditScreen, editPostTitleBody, changeEditHelpText } from '../store/editPostWindow';


import logoPic from '../img/labsLogo.png';

import { fetchSpecial } from '../serverComunication.js';

import { changeLoadedComments} from '../store/commentWindow';

import { changePosts } from '../store/loadedPosts';
import { Co2Sharp } from '@mui/icons-material';

import { ExtraFunctions } from '../extraFunctions';




export default function EditPostWindow() {
    const dispatch = useDispatch();
    const editPostWindow = useSelector(state => state.editPostWindow);


    const newPostWindow = useSelector(state => state.newPostWindow);
    const loadedPosts = useSelector(state => state.loadedPosts);
    const currentUser = useSelector(state=>state.currentUser);
    const commentWindow = useSelector(state => state.commentWindow);

    function handleClose() {
        dispatch(hidePostEditScreen());
    };
    
    const handleTextInputChange = event => {
        dispatch(editPostTitleBody({title:editPostWindow.title, body:event.target.value,  postID: editPostWindow.postID, isThisPostEdit: editPostWindow.isThisPostEdit}));
    };
    const handleTitleInputChange = event => {
        dispatch(editPostTitleBody({title:event.target.value, body:editPostWindow.body, postID: editPostWindow.postID, isThisPostEdit: editPostWindow.isThisPostEdit}));
    };

    const updatePost = async () =>{
        if((editPostWindow.title != "" && editPostWindow.body != "") || (!editPostWindow.isThisPostEdit && editPostWindow.body != "")){
            if(editPostWindow.isThisPostEdit){
                let res = await fetchSpecial("updatePost", {postID: editPostWindow.postID, title: editPostWindow.title, body:editPostWindow.body}, false);
                dispatch(hidePostEditScreen());
    
                let recentPost = (await fetchSpecial("getRecentPosts", {clientName: currentUser.name, postID: editPostWindow.postID}, (currentUser.name != "" ? false: true )))[0];
                let filteredLoadedPosts =  loadedPosts.posts.filter(post =>{
                    return post.ID != recentPost.ID;
                })
                dispatch(changePosts({posts:[recentPost, ...filteredLoadedPosts]}));
            }else{
                let res = await fetchSpecial("updateComment", {commentID: editPostWindow.postID, body:editPostWindow.body}, false);
                dispatch(hidePostEditScreen());
                let commentsForPost = ((await fetchSpecial("getCommentsForPost", {postID:commentWindow.postID, clientName:currentUser.name}, !ExtraFunctions.isUserLoggedIn())));
                dispatch(changeLoadedComments({comments: commentsForPost}));
            }
        }else{
            dispatch(changeEditHelpText({helpText:"You must type something..."}));
        }
    }


    if (editPostWindow.visible) {
        return (
            <div className="Container">
                <div className="Edit-Post-white-box" style={{}}>
                    <div className="editPostPart" ><div className="close-button" onClick={() => { handleClose() }}>
                        X
                    </div>
                    </div>
                    <div className='editPostPart' style={{ textAlign: "center", height: 40, fontSize: 30, marginTop: -20 }}>{editPostWindow.isThisPostEdit ? "Edit Your Post" : "Edit Your Comment"}</div>

                    <div className="postInputHolder" style={{width: "80%", margin: "auto" }}>
                    {editPostWindow.isThisPostEdit ? (<input type='text' placeholder='Title' className='TitleInput' onChange={handleTitleInputChange} value={editPostWindow.title}></input>): <></> }

                        <textarea type='text' placeholder='Your Thoughts...' className='PostTextInput'
                        onChange={handleTextInputChange} value={editPostWindow.body} style={{}}></textarea>
                        <div className='newPosthelperText'>{editPostWindow.helpText}</div>
                    </div>


                    <button className='postButton' onClick={()=>{updatePost()}}>Change</button>
                </div>
            </div>
        );

    } else {
        return (
            <></>
        )
    }

};