module.exports = {
    getXorO: number => {
        let letter = ''
        if (number === 1) {
            letter = 'close'
        } else if (number === 2) {
            letter ='panorama_fish_eye'
        }
        return letter
    },
    isFinished: string => {
        let bool = false
        if (string === 'finished') {
            bool = true
        }
        return bool
    },
    currentTurn: (session, game) => {
        let string = ''
        if (game.whos_turn.id === session.user_id) {
            string = "It is your turn"
        } else {
            string = `It is ${game.whos_turn.username}'s turn`
        }
        return string
    }
}