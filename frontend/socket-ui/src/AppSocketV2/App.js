
// import './custom.css';
import './App.css';


import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

import { SocketEventService } from './SocketService/SocketService';

import AppControlPanel from './AppControlPanel/AppControlPanel';

import ChatTextPanel from './ChatTextPanel/ChatTextPanel';

export default function AppLanding(){

    const [socketClient, setSocketClient] = useState(null);

    const [userSocketId, setUserSocketId] = useState(null);
    const [socketStatus, setSocketStatus] = useState(false);

    const [userRoomsList, setUserRoomsList] = useState(null);


    //initialize the socket client instance
    useEffect(()=>{
        setSocketClient(io({
            path:"/chat-api",
            autoConnect: false, 
            reconnection: false
        }));
    }, []);

    // fetch the rooms details - GET method on localhost:5000/get-rooms
    useEffect(()=>{
        fetch('/get-rooms')
        .then(res => (res.status>=200 && res.status<=299) ? res.json() : [])    // if the server status is ok, then return the data in a json format, else return an empty array
        .then(result => {
            setUserRoomsList(result);
        });
    }, []);

    // a side effect to log the list of rooms obtained from the server
    useEffect(()=>{
        console.log(userRoomsList);
    }, [userRoomsList]);

    //subscribe to the socket events
    useEffect(()=>{
        if (!socketClient){
            return;
        }
        SocketEventService(socketClient, setUserSocketId);
    }, [socketClient]);


    // chain the state change for the socket status
    useEffect(()=>{
        if(!socketClient){      // when the socket has not been instanciated
            setSocketStatus(false);
            return;
        }
        setSocketStatus(socketClient.connected);
    }, [userSocketId]);


    return(
        <div className="app-container">
            <div className="app-sidebar">
                <AppControlPanel socket={socketClient} socketStatus={socketStatus} socketId={userSocketId} roomsList={userRoomsList}></AppControlPanel>
            </div>
            <div className="app-text-interface">
                <ChatTextPanel socket={socketClient} socketStatus={socketStatus}></ChatTextPanel>
            </div>
        </div>
    )
}
