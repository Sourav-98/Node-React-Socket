
import "./ChatTextPanel.css";

import { MdSend } from "react-icons/md";

import { useState, useEffect } from "react";

import { SocketChatMessagingService } from './SocketChatMessagingService';

export default function ChatTextPanel(props){

    const [inputText, setInputText] = useState('');

    const [textAreaFocus, setTextAreaFocus] = useState(false);

    // useEffect(()=>{
    //     console.log(props.socket);
    // }, [props.socketStatus]);


    useEffect(()=>{
        if(!props.socket){
            return;
        }
        SocketChatMessagingService(props.socket);

    }, [props.socket])

    function inputTextHandler(event){
        setInputText(event.target.value);
    }

    function focusHandler(event){
        setTextAreaFocus(true);
    }

    function blurHandler(event){
        setTextAreaFocus(false);
    }

    function enterKeyPressHandler(keyEvent){
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
                <input id="text-message" value={inputText} placeholder="Enter Message..." onChange={inputTextHandler} onFocus={focusHandler} onBlur={blurHandler} onKeyPress={enterKeyPressHandler}/>
                <button id="messageButton" onClick={messageTransmit}>
                    <MdSend></MdSend>
                </button>
            </div>
        </div>
    );
}
