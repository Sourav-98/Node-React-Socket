
import './ChatTextElement.css';

import { IoCheckmarkSharp, IoCheckmarkDoneSharp, IoTimeOutline } from 'react-icons/io5';

import React from 'react';


/*

ChatTextElement - displays the chat text sent by the user along with the metadata

props =>

sender_id
chat_text
chat_timestamp
chat_status = sending, sent, received, read

*/
function ChatTextElement(props){


    function chatStatus(){
        switch(props.status){
            case 'sending':
                return  <div className="text-status-marker">
                            <IoTimeOutline></IoTimeOutline>
                        </div>;
            case 'sent':
                return  <div className="text-status-marker">
                            <IoCheckmarkSharp></IoCheckmarkSharp>
                        </div>;
            case 'received':
                return  <div className="text-status-marker">
                            <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                        </div>;
            case 'read':
                return  <div className="text-status-marker blue">
                            <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                        </div>;
        }
    }

    return(
        <div className={`chat-text-element-container ${props.align}`}>
            <div className="chat-text-element-item">
                <div className="text-area-block">
                    <span>{props.text}</span>
                </div>
                <div className="text-meta-data-block">
                    <div>
                        <span>{props.time}</span>
                    </div>
                    {chatStatus()}
                </div>
            </div>
        </div>
    );
}

export default React.memo(ChatTextElement);
