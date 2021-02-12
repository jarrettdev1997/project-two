class toClient {
    constructor(socket, io) {
        this.socket = socket,
        this.io = io
    }
    broadcastBoardUpdate(data) {
        this.io.emit('testing', {message: 'hello'})
    }
}

module.exports = (socket, io) => new toClient(socket, io)