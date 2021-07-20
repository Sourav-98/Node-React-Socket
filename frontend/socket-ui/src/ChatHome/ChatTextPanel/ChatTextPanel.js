
import "./ChatTextPanel.css";

import { MdSend } from "react-icons/md";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { SocketChatMessagingService } from './SocketChatMessagingService';

import ChatTextElement from "./ChatTextElement/ChatTextElement";
import ChatDisplayPanel from "./ChatDisplayPanel/ChatDisplayPanel";

import BubbleBounceLoader from './TextPanelAnimationUtil/BubbleBounceLoader/BubbleBounceLoader';
import BubbleZoomLoader from './TextPanelAnimationUtil/BubbleZoomLoader/BubbleZoomLoader';

function ChatTextPanel(props){

    const [inputText, setInputText] = useState('');
    const [textAreaFocus, setTextAreaFocus] = useState(false);

    const [chatThread, setChatThread] = useState([]);

    const [firstLoadFlag, setFirstLoadFlag] = useState(false);
    const [prevLoadFlag, setPrevLoadFlag] = useState(false);
    const [newChatFlag, setNewChatFlag] = useState(false);

    const lastMsgCount = useRef(0);
    const chatWindow = useRef(0);


    // Chat Thread First Load
    useEffect(()=>{
        setInitialChat();
    }, []);

    // chat socket interface
    useEffect(()=>{
        if(!props.socket){
            return;
        }
        SocketChatMessagingService(props.socket);
    }, [props.socket]);

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
        let chatTempThread = [...chatThread];
        chatTempThread.push({
            _id: Math.random().toString(),
            text: inputText, 
            align: 'right',
            status: 'sent',
            timestamp: 'DD/MM/YY HH:mm'
        });
        // newChatFlag = true;
        setNewChatFlag(true);
        setChatThread(chatTempThread);
        setInputText('');
    }

    function setInitialChat(){
        (async ()=>{
            let chatData = await fetchChatInitial();
            // firstLoadFlag = true;
            setFirstLoadFlag(true);
            setChatThread(chatData);
        })()
    }

    function setPreviousChat(){
        (async()=>{
            let chatTemp = [...chatThread];
            let previousChatData = await fetchChatRange();
            chatTemp.unshift(...previousChatData);
            setTimeout(()=>{
                // prevLoadFlag = true;
                setPrevLoadFlag(true);
                setChatThread(chatTemp);
            }, 500);
        })();
    }

    // API fetch chat data
    const fetchChatInitial = async()=>{
        let response = await fetch('/user/get-chat-thread-first');
        let chatData = await response.json();
        lastMsgCount.current = chatData.chatLength;
        chatWindow.current = chatData.chatWindow;
        return chatData.chatData;
    }

    const fetchChatRange = async()=>{
        console.log('last msg count: ' + lastMsgCount.current);
        let response = await fetch(`/user/get-chat-thread-range/${lastMsgCount.current}`);
        let previousChatData = await response.json();
        lastMsgCount.current = lastMsgCount.current - chatWindow.current;
        return previousChatData;
    }

    return(
        <div className="chat-text-panel-container">
            <div className="chat-info-box">
                
            </div>
            <ChatDisplayPanel chatThread={chatThread} firstLoadFlag={firstLoadFlag} prevLoadFlag={prevLoadFlag} newChatFlag={newChatFlag} setFirstLoadFlag={setFirstLoadFlag} setPrevLoadFlag={setPrevLoadFlag} setNewChatFlag={setNewChatFlag} setPreviousChat={setPreviousChat}></ChatDisplayPanel>
            {/* <div ref={chatBoxRef} id="main-chat-thread-box" onScroll={chatScrollHandler} className="chat-thread-box">
                <BubbleBounceLoader></BubbleBounceLoader>
                <BubbleZoomLoader></BubbleZoomLoader>
                <br/>
                {
                    chatThread.map( (chatElement, index) => {
                        return(
                            <ChatTextElement key={chatElement._id} text={chatElement.text} align={chatElement.align} status={chatElement.status} time={chatElement.timestamp}></ChatTextElement>
                        )
                    })
               }
            </div>     */}
            <div className="chat-text-area-box">
                <input id="text-message" value={inputText} placeholder="Enter Message..." onChange={inputTextHandler} onFocus={focusHandler} onBlur={blurHandler} onKeyPress={enterKeyPressHandler}/>
                <button id="messageButton" onClick={messageTransmit}>
                    <MdSend></MdSend>
                </button>
            </div>
        </div>
    );
}

export default React.memo(ChatTextPanel);
