
const socketio = require('socket.io')

class SocketConnection {

    static _io = socketio;

    static init(httpServer, socketConfig){
        this._io.createServer(httpServer, socketConfig);
    }

    static getSocketConnection(){
        return this._io;
    }

}