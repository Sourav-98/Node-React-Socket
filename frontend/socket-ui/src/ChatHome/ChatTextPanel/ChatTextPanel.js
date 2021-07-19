
import "./ChatTextPanel.css";

import { MdSend } from "react-icons/md";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { SocketChatMessagingService } from './SocketChatMessagingService';

import ChatTextElement from "./ChatTextElement/ChatTextElement";



let firstLoadFlag = false;
let prevLoadFlag = false;
let newChatFlag = false;

let currentScrollHeight = 0;
let currentScrollTop = 0;

let lastMsgCount = 0;
let chatWindow = 0;

function ChatTextPanel(props){

    const [inputText, setInputText] = useState('');
    const [textAreaFocus, setTextAreaFocus] = useState(false);

    const chatBoxRef = useRef();

    const [chatThread, setChatThread] = useState([]);
    // const lastMsgCount = useRef(0);

    // Re render marker - debugging
    useEffect(()=>{
        console.log("--------------RENDERED--------------");
    });

    // Chat Thread First Load
    useEffect(()=>{
        (async ()=>{
            let chatData = await fetchChatInitial();
            firstLoadFlag = true;
            setChatThread(chatData);
        })()
    }, []);

    // updating the flag bits accordingly for useLayoutEffect()
    useEffect(()=>{
        if(firstLoadFlag){
            console.log('First Load');
            firstLoadFlag = false;
        }
        if(prevLoadFlag){
            console.log('Previous Load');
            prevLoadFlag = false;
        }
        if(newChatFlag){
            console.log('New Chat Load');
            newChatFlag = false;
        }
    }, [chatThread]);

    // setting the scroll positions of the chat box
    useLayoutEffect(()=>{
        if(firstLoadFlag){
            dropToBottom(chatBoxRef.current);
        }
        if(prevLoadFlag){
            maintainScrollOnPrevLoad(chatBoxRef.current);
        }
        if(newChatFlag){
            dropToBottom(chatBoxRef.current, true);
        }
    }, [chatThread]);


    // chat socket interface
    useEffect(()=>{
        if(!props.socket){
            return;
        }
        SocketChatMessagingService(props.socket);
    }, [props.socket]);


    const dropToBottom = (parentRef, isSmooth = false)=>{
        currentScrollHeight = parentRef.scrollHeight;
        parentRef.scrollTo({
            top: parentRef.scrollHeight - parentRef.clientHeight,
            behavior: isSmooth ? 'smooth' : 'auto'
        });
    }

    const maintainScrollOnPrevLoad = (parentRef)=>{
        let newScrollHeight = parentRef.scrollHeight;
        console.log("Current Scroll Top: " + currentScrollTop);
        parentRef.scrollTo({
            top: newScrollHeight - currentScrollHeight + currentScrollTop,
            behavior: 'auto'
        });
        currentScrollTop = parentRef.scrollTop;
        currentScrollHeight = newScrollHeight;
    }

    const chatScrollHandler = (event)=>{
        let chatBox = event.target;
        currentScrollTop = chatBox.scrollTop;
        if(chatBox.scrollTop === 0){
            // load previous chats when reached the top of the chatbox div
            console.log('Reached Top of the chat thread');
            (async()=>{
                let chatTemp = [...chatThread];
                let previousChatData = await fetchChatRange();
                chatTemp.unshift(...previousChatData);
                setTimeout(()=>{
                    prevLoadFlag = true;
                    setChatThread(chatTemp);
                }, 500);
            })();

        }
        if(chatBox.scrollTop === chatBox.scrollHeight - chatBox.clientHeight){
            console.log('Reached Bottom of the chat thread');
        }
    }

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
        newChatFlag = true;
        setChatThread(chatTempThread);
        setInputText('');
    }

    // API fetch chat data
    const fetchChatInitial = async()=>{
        let response = await fetch('/user/get-chat-thread-first');
        let chatData = await response.json();
        lastMsgCount = chatData.chatLength;
        chatWindow = chatData.chatWindow;
        return chatData.chatData;
    }

    const fetchChatRange = async()=>{
        console.log('last msg count: ' + lastMsgCount);
        let response = await fetch(`/user/get-chat-thread-range/${lastMsgCount}`);
        let previousChatData = await response.json();
        lastMsgCount = lastMsgCount - chatWindow;
        return previousChatData;
    }

    return(
        <div className="chat-text-panel-container">
            <div className="chat-info-box"></div>
            <div ref={chatBoxRef} id="main-chat-thread-box" onScroll={chatScrollHandler} className="chat-thread-box">
                <br/>
                <br/>
                <span id="chat-loader">Loading...</span>
                <br/>
                <br/>
                {
                    chatThread.map( (chatElement, index) => {
                        return(
                            <ChatTextElement key={chatElement._id} text={chatElement.text} align={chatElement.align} status={chatElement.status} time={chatElement.timestamp}></ChatTextElement>
                        )
                    })
               }
            </div>    
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
