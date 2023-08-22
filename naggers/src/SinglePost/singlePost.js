import '../App.css';
import { useState } from 'react';
import "./singlePost.css";



export default function SinglePost({ value }) {
    return (
        <div className='SinglePost'>
            {value}
        </div>
    )
}
