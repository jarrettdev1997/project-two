const { User, Board } = require('../model')

class fromClient {
    constructor(socket, io) {
        socket.on('clicked box', (data, callback) => {
            Board.update(
                {
                    upper_left: data.board.upper_left,
                    upper_mid: data.board.upper_mid,
                    upper_right: data.board.upper_right,
                    center_left: data.board.center_left,
                    center_mid: data.board.center_mid,
                    center_right: data.board.center_right,
                    lower_left: data.board.lower_left,
                    lower_mid: data.board.lower_mid,
                    lower_right: data.board.lower_right,
                },
                {
                    where: { id: data.gameId }
                }
            )
            .then(dbData => {
                Board.findOne({
                    where: { id: data.gameId }
                })
                .then(dbData => callback(dbData))
            })
        })  
    }
}

module.exports = (socket, io) => new fromClient(socket, io)
