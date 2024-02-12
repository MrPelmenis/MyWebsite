import '../App.css';
import { useState } from 'react';
import "./mainPart.css";
import SinglePost from '../SinglePost/singlePost';
import React, { useEffect } from "react";
import { fetchSpecial } from '../serverComunication';


import { useDispatch, useSelector } from 'react-redux';

import { changePosts } from '../store/loadedPosts';

export default function MainPart() {
    const [mainPartWidth, setWidth] = useState(window.innerWidth);
    useEffect( () => {
        document.title = 'Naggers';
        makeInsides();
    }, []);


    const [postArray, setPostArray] = useState([]);
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser);
    const loadedPosts = useSelector(state => state.loadedPosts);


    const makeInsides = async () =>{
        let recentPosts = ((await fetchSpecial("getRecentPosts", {clientName: currentUser.name, postID:""}, (currentUser.name != "" ? false: true ))));
        dispatch(changePosts({posts:recentPosts}));
    }

    const makePostsIntoReactObjects = (posts)=>{
        return posts.map(post => {
            return (<SinglePost key={(post.TITLE + post.BODY + post.DATE_TIME)}
             date={post.DATE_TIME} title={post.TITLE} body={post.BODY}
             likeAmount={post.LikeAmount} authorName={post.AuthorName} id={post.ID} readingUser={currentUser.name} isPostLikedByUser={post.isLikedByCurrentUser}></SinglePost>)
        });
    }

   

      

    return (
        <div className='MainPart' id='MainPart'>
            {makePostsIntoReactObjects(loadedPosts.posts)}
        </div>
    )
}