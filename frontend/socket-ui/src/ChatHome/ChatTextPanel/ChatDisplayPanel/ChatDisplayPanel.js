
import { useState, useRef, useEffect, useLayoutEffect } from "react";

import BubbleZoomLoader from './../TextPanelAnimationUtil/BubbleZoomLoader/BubbleZoomLoader';
import './ChatDisplayPanel.css';

import ChatTextElement from './../ChatTextElement/ChatTextElement';

let currentScrollHeight = 0;
let currentScrollTop = 0;

export default function ChatDisplayPanel(props){
    

    const chatBoxRef = useRef();
    const [chatBottomMarker, setChatBottomMarker] = useState(false);

    // updating the flag bits accordingly for useLayoutEffect() to set the scroll positions
    useEffect(()=>{
        if(props.firstLoadFlag){
            console.log('First Load');
            props.setFirstLoadFlag(false)
        }
        if(props.prevLoadFlag){
            console.log('Previous Load');
            props.setPrevLoadFlag(false);
        }
        if(props.newChatFlag){
            console.log('New Chat Load');
            props.setNewChatFlag(false);
        }
    }, [props.chatThread]);

    // setting the scroll positions of the chat box
    useLayoutEffect(()=>{
        if(props.firstLoadFlag){
            dropToBottom(chatBoxRef.current);
        }
        if(props.prevLoadFlag){
            maintainScrollOnPrevLoad(chatBoxRef.current);          
        }
        if(props.newChatFlag && chatBottomMarker){
            dropToBottom(chatBoxRef.current, true);
        }
    }, [props.chatThread]);


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
            props.setPreviousChat();
        }
        if(chatBox.scrollTop === chatBox.scrollHeight - chatBox.clientHeight){
            console.log('Reached Bottom of the chat thread');
        }
        if(chatBox.scrollTop >= chatBox.scrollHeight - chatBox.clientHeight - 140){
            setChatBottomMarker(true);
        }
        else{
            setChatBottomMarker(false);
        }
    }

    return(
        <div ref={chatBoxRef} onScroll={chatScrollHandler} className="chat-thread-box">
            <BubbleZoomLoader></BubbleZoomLoader>
            <br/>
            {
                props.chatThread.map( (chatElement, index) => 
                        <ChatTextElement key={chatElement._id} text={chatElement.text} align={chatElement.align} status={chatElement.status} time={chatElement.timestamp}></ChatTextElement>
                )
            }
        </div>
    )
}
