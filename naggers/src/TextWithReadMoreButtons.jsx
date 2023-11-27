import './App.css';
import { useState } from 'react';

export default function TextWithReadMoreButton(props) {

    const maxTextLength = 200;


    const [maxLength, setLength] = useState(maxTextLength);


    const textShortener = (inputText, maxLength) => {
        if(inputText){
            if (maxLength == -1) {
                return inputText;
            } else {
                if(inputText.length< maxLength){
                    return inputText;
                }else{
                    return inputText.substring(0, maxLength) + "...";
                }
            }
        }else{
            return "";
        }
    }

    const changeLength = () => {
        if (maxLength == -1) {
            setLength(maxTextLength);
        } else {
            setLength(-1);
        }

    }

    const buttonChecker = () => {
        if (props.text.length > maxTextLength) {
            return (<button className='readMoreOrLess' onClick={() => changeLength()}>{maxLength == -1 ? "Read Less" : "Read More"}</button>)
        }
    }

    return (
        <div>{textShortener(props.text, maxLength)}  {buttonChecker()}</div>
    );
}