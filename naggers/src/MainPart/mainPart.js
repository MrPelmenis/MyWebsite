import '../App.css';
import { useState } from 'react';
import "./mainPart.css";
import SinglePost from '../SinglePost/singlePost';
import React, { useEffect } from "react";
import { fetchSpecial } from '../serverComunication';

export default function MainPart() {
    const [mainPartWidth, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    let [postsAllreadyLoaded, setPostsAllreadyLoaded] = useState(false);
    const [postArray, setPostArray] = useState([]);
    const makeInsides = async () =>{
        let recentPosts = ((await fetchSpecial("getRecentPosts", { }, false)));
        console.log(recentPosts);
        let postArrayTemp = [];
        recentPosts.forEach(post => {
            postArrayTemp.push(<SinglePost key={(post.TITLE + post.BODY + post.DATE_TIME)} date={post.DATE_TIME} title={post.TITLE} body={post.BODY} likeAmount={post.LikeAmount} authorName={post.AuthorName}></SinglePost>);
        });
        setPostsAllreadyLoaded(true);
        setPostArray(postArrayTemp);
        
    }

    if(!postsAllreadyLoaded){
        makeInsides();
        console.log("makeInsides");
    }
      

    return (
        <div className='MainPart' id='MainPart' style={{ width: mainPartWidth }}>
            {postArray}
        </div>
    )
}