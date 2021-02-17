const getStats = (games, userId) => {
    let wins = 0, losses = 0, ties = 0
    games.forEach(game => {
        if (game.status !== "finished") {
            return
        }
        if (game.winner_id === userId) {
            wins++
        } else if (game.loser_id === userId) {
            losses++
        } else {
            ties++
        }
    })
    return {wins, losses, ties}
}

const getGameHistory = (games, userId) => {
    let inprogressGames = [], waitingGames = [], pendingGames = [], finishedGames = []
    games.forEach(game => {
        switch (game.status) {
            case "in_progress":
                let name = ""
                if (game.owner_id === userId) {
                    name = game.friend.username
                } else {
                    name = game.game_owner.username
                }
                inprogressGames.push({
                    opponent: name,
                    gameId: game.id
                })
                break;
            case "not_started":
                if (game.owner_id === userId) {
                    let name = game.friend.username
                    pendingGames.push({
                        opponent: name,
                        gameId: game.id
                    })
                } else {
                    let name = game.game_owner.username
                    waitingGames.push({
                        opponent: name,
                        gameId: game.id
                    })
                }
                break;
            case "finished":
                let message = ""
                if (game.winner_id === userId) {
                    message = `You beat ${game.loser.username} in this game`
                } else if (game.loser_id === userId) {
                    message = `You lost to ${game.winner.username} in this game`
                } else {
                    if (game.owner_id === userId) {
                        message = `You tied with ${game.friend.username} in this game`
                    } else {
                        message = `You tied with ${game.game_owner.username} in this game`
                    }
                }
                finishedGames.push({
                    message: message,
                    gameId: game.id
                })
                break;
        }
    })
    return { inprogressGames, waitingGames, pendingGames, finishedGames }
}

module.exports = { getStats, getGameHistory }