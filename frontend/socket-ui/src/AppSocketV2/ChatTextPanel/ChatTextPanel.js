
import "./ChatTextPanel.css";

import { MdSend } from "react-icons/md";

import { useState, useEffect } from "react";

export default function ChatTextPanel(props){

    const [inputText, setInputText] = useState('');

    const [textAreaFocus, setTextAreaFocus] = useState(false);


    useEffect(()=>{
        console.log(props.socket);
    }, [props.socketStatus]);

    function inputTextHandler(event){
        setInputText(event.target.value);
    }

    function focusHandler(event){
        setTextAreaFocus(true);
    }

    function blurHandler(event){
        setTextAreaFocus(false);
    }

    function EnterKeyPressHandler(keyEvent){
        if(keyEvent.which === 13 && textAreaFocus){
            messageTransmit();
        }
    }

    // send message via socket instance in the props
    function messageTransmit(){
        console.log(inputText);
        setInputText('');
    }

    return(
        <div className="chat-text-panel-container">
            <div className="chat-info-box"></div>
            <div className="chat-thread-box"></div>
            <div className="chat-text-area-box">
                <input id="text-message" value={inputText} placeholder="Enter Message..." onChange={inputTextHandler} onFocus={focusHandler} onBlur={blurHandler} onKeyPress={EnterKeyPressHandler}/>
                <button id="messageButton" onClick={messageTransmit}>
                    <MdSend></MdSend>
                </button>
            </div>
        </div>
    );
}
