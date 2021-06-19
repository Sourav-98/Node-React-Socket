
import "./AppControlPanel.css";

export default function AppControlPanel(props){

    async function wsConnect(){
        console.log('Socket Connection Requested...');
        props.socket.open();
    }

    async function wsDisconnect(){
        console.log('Socket Disconnection Requested...');
        props.socket.close();
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

    const RoomsListElement = function(props){
        if(!props.roomsList){
            return(
                <div className="rooms-list">
                    <h4>No Rooms found!</h4>
                </div>
            );
        }
        else{
            return(
                    <ul>
                        {props.roomsList.map(room => (
                            <li key={room.room_id}> { room.room_id } : { room.room_name }</li>
                        ))}
                    </ul>

            );
        }
    }


    return(
        <div className="app-control-container">
            <div className="app-title-pane">
                <h4>DUMMY CHAT APP</h4>
            </div>
            <div className="user-socket-interface">
                <div>
                    <button className='block outlined success' disabled={props.socketStatus} onClick={wsConnect}>Connect</button>
                </div>
                <div>
                    <button className="block outlined danger" disabled={!props.socketStatus} onClick={wsDisconnect}>Disconnect</button>
                </div>
            </div>
            <div className="user-rooms-list">
                <RoomsListElement roomsList={props.roomsList}></RoomsListElement>
            </div>
            <div className="user-socket-status">
                <SocketStatusElement userSocketStatus={props.socketStatus} socketId={props.socketId}></SocketStatusElement>
            </div>
        </div>
    );
}
