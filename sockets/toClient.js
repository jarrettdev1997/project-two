class toClient {
    constructor() {}
    emitBoardUpdate(app, gameId, data) {
        app.io.emit(`game-${gameId}`, data)
    }
}

module.exports = toClient