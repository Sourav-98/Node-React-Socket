
import "./ChatTextPanel.css";

import { MdSend } from "react-icons/md";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { SocketChatMessagingService } from './SocketChatMessagingService';

import ChatTextElement from "./ChatTextElement/ChatTextElement";

function ChatTextPanel(props){

    const [inputText, setInputText] = useState('');
    const [textAreaFocus, setTextAreaFocus] = useState(false);

    const chatBoxRef = useRef();
    const currentScrollHeight = useRef(0);
    const currentScrollTop = useRef(0);

    const firstLoad = useRef(true);

    const [chatThread, setChatThread] = useState([]);
    const lastMsgCount = useRef(0);

    // useEffect(()=>{
    //     console.log("--------------RENDERED--------------");
    // });

    // chats first load
    useEffect(()=>{
        (async ()=>{
            let chatData = await fetchChatInitial();
            setChatThread(chatData);
            firstLoad.current = false;
        })()
    }, []);

    // setting the scroll positions of the chat box
    useLayoutEffect(()=>{
        if(firstLoad.current){
            // console.log('First Load');
            dropToBottom(chatBoxRef.current);
        }
        else{
            // console.log('Previous Load');
            maintainScroll(chatBoxRef.current);
        }
    }, [chatThread]);

    useEffect(()=>{
        if(!props.socket){
            return;
        }
        SocketChatMessagingService(props.socket);

    }, [props.socket]);


    const dropToBottom = (parentRef, isSmooth = false)=>{
        currentScrollHeight.current = parentRef.scrollHeight;
        parentRef.style.scrollBehavior = isSmooth ? 'smooth' : 'auto';
        parentRef.scrollTop = parentRef.scrollHeight - parentRef.clientHeight;
        parentRef.style.scrollBehavior = 'auto';
    }

    const maintainScroll = (parentRef)=>{
        let newScrollHeight = parentRef.scrollHeight;
        console.log("Current Scroll Top: " + currentScrollTop.current);
        parentRef.scrollTo({
            top: newScrollHeight - currentScrollHeight.current + currentScrollTop.current,
            behavior: 'auto'
        });
        currentScrollTop.current = parentRef.scrollTop;
        currentScrollHeight.current = newScrollHeight;
    }

    const chatScrollHandler = (event)=>{
        let chatBox = event.target;
        currentScrollTop.current = chatBox.scrollTop;
        if(chatBox.scrollTop === 0){
            console.log('Reached Top of the chat thread');
            (async()=>{
                let chatTemp = [...chatThread];
                let previousChatData = await fetchChatRange();
                chatTemp.unshift(...previousChatData);
                setTimeout(()=>{
                    setChatThread(chatTemp);
                }, 1000);
            })();

        }
        // console.log('Scroll Height: '+ chatBox.scrollHeight);
        // console.log('Client Height: '+ chatBox.clientHeight);
        // console.log('Scroll Top: '+ chatBox.scrollTop);
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
        setChatThread(chatTempThread);
        setInputText('');
    }

    const fetchChatInitial = async()=>{
        let response = await fetch('/user/get-chat-thread-first');
        let chatData = await response.json();
        lastMsgCount.current = chatData.chatLength;
        return chatData.chatData;
    }

    const fetchChatRange = async()=>{
        console.log('last msg count: ' + lastMsgCount.current);
        let response = await fetch(`/user/get-chat-thread-range/${lastMsgCount.current}`);
        let previousChatData = await response.json();
        lastMsgCount.current = lastMsgCount.current - 20;
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

export default ChatTextPanel;
