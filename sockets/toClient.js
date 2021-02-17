class toClient {
    constructor() {}
    emitBoardUpdate(app, gameId, turnId, board) {
        app.io.emit(`game-${gameId}`, { turnId, board })
    }
}

module.exports = toClient