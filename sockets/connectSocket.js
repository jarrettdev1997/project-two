// 'https://socket.io/get-started/chat' source for how we set up the socket

class socketConnection {
    constructor(io) {
        io.on('connection', (socket) => {
            console.log('a user connected')
            socket.on('disconnect', () => {
                console.log('user disconnected')
            })
            require('./fromClient')(socket, io);
            require('./toClient')(socket, io)
        })
    }
}

module.exports = (io) => new socketConnection(io)