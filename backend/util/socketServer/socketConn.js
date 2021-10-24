
const socketio = require('socket.io')

class SocketConnection {

    static _io = undefined;

    static init(httpServer, socketConfig){
        if(this._io == undefined || this._io == null){
            this._io = socketio(httpServer, socketConfig);
        }
    }

    static getSocketConnection(){
        return this._io;
    }
}

module.exports = { SocketConnection };
