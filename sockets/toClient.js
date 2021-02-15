class toClient {
    constructor() {}
    emitBoardUpdate(app, gameId, data) {
        app.io.emit('testing ' + gameId, data)
    }
}

module.exports = toClient