
import './custom.css';
import './App.css';


import { useState, useEffect, useRef } from 'react';

import { io } from "socket.io-client";

import { SocketEventService } from './SocketService/SocketService';

export default function App(){

    // const host_url = "http://localhost:5000";

    // const socket = useRef(ioClient({
    //     path:"/chat-api",
    //     autoConnect: false,
    //     reconnection: false
    // }));

    const [socketClient, setSocketClient] = useState(null);

    const [userSocketId, setUserSocketId] = useState(null);
    const [socketStatus, setSocketStatus] = useState(false);


    //initialize the socket client instance

    useEffect(()=>{
        setSocketClient(io({
            path:"/chat-api",
            autoConnect: false
        }));
    }, []);

    //subscribe to the socket events
    useEffect(()=>{

        if (!socketClient){
            return;
        }

        SocketEventService(socketClient, setUserSocketId);

        // socketClient.on("new-socket-id", (id)=>{
        //     console.log("Socket Id received from the server: " + id);
        //     setUserSocketId(id);
        // });

        // socketClient.on("disconnect", ()=>{
        //     console.log("Socket User Disconnected!");
        //     setUserSocketId(null);
        // })

        // socket.current.on("new-socket-id", (id)=>{
        //     console.log("Id received from the server: "+ id);
        //     setUserSocketId(id);
        // });

        // socket.current.on('disconnect', ()=>{
        //     console.log("Socket User disconnected...");
        //     // setUserSocketId(null);
        //     console.log('Attempting to reconnect...');
        //     // socket.current.connect();
        //     wsConnect();
        // });

    }, [socketClient]);

    // chain the state change for the socket status
    useEffect(()=>{
        if(!userSocketId){
            setSocketStatus(false);
        }
        else{
            setSocketStatus(true);
        }
    }, [userSocketId])


    async function wsConnect(){
        console.log('Socket Connection Requested...');
        socketClient.open();
    }

    async function wsDisconnect(){
        console.log('Socket Disconnection Requested...');
        socketClient.close();
    }


    const SocketStatusElement = function(props){
        return (
            <div className={`status-div ${props.userSocketStatus ? 'online' : 'offline'}`}>
                {props.userSocketStatus
                    ? <span>ONLINE - Socket Id: {props.socketId}</span>
                    : <span>OFFLINE</span>
                }
            </div>
        )
    }

    return(
        <div className="app-container">
            <div className="app-sidebar">
                <div className="app-title-pane">
                    <h4>DUMMY CHAT APP</h4>
                </div>
                <div className="user-socket-interface">
                    <div>
                        <button className='block outlined success' disabled={socketStatus} onClick={wsConnect}>Connect</button>
                    </div>
                    <div>
                        <button className="block outlined danger" disabled={!socketStatus} onClick={wsDisconnect}>Disconnect</button>
                    </div>
                </div>
                <div className="user-socket-status">
                    <SocketStatusElement userSocketStatus={socketStatus} socketId={userSocketId}></SocketStatusElement>
                </div>
            </div>
            <div className="app-text-interface">

            </div>
        </div>
    )
}
