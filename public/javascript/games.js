const gameService = require('./services/game-service')

var socket = io()

const sendUpdateToServer = function() {
    const boardTable = $("#board-game")

    const clickOptions = ["upper_left", "upper_mid", "upper_right", "center_left", "center_mid", "center_right", "lower_left", "lower_mid", "lower_right"]

    const clickedId = $(this).attr('id')

    if(!clickOptions.includes(clickedId)) {
        console.log(`id didnt match`)
        return
    }

    if($(this).text().trim()) {
        console.log(`you can't click here`)
        return
    }

    const gameId = boardTable.dataset.gameid

    fetch(`/api/boards/${gameId}`, {
        method: 'put',
        body: JSON.stringify({
            cellClicked: cellClickedId
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then(dbData => {
        console.log({ fromJS: dbData })
    })      
}

// const XorOorBlank = (text) => {
//     let cell = 0
//     switch (text) {
//         case 'close':
//             cell= 1
//             break;
//         case 'panorama_fish_eye':
//             cell= 2
//             break;
//         default:
//             cell = 0
//             break;
//     }
//     return cell
// }

// const createBoardObject = function () {
//     const boardCells = $("table#board-game td")
//     const boardObj = {}
//     boardCells.each(function() {
//         console.log($(this).attr('id'))
//         boardObj[$(this).attr('id')] = XorOorBlank($(this).text())
//     })
//     console.log(boardObj)
// }

const sendFinalToServer = (gameInfo) => {
    fetch(`/api/games/final/${gameInfo.id}`, {
        method: 'put',
        body: JSON.stringify({
            status: gameInfo.status,
            winner: gameInfo.winner
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then(dbData => {
        console.log({ fromJS: dbData })
    }) 
}

const XorOorBlank = (number) => {
    let cell = ''
    switch (number) {
        case 1:
            cell= 'close'
            break;
        case 2:
            cell= 'panorama_fish_eye'
            break;
        default:
            cell = ''
            break;
    }
    return cell
}

const fillInBoard = (board) => {
    const boardCells = $("table#board-game td")
    boardCells.each(function() {
        $(this).text(XorOorBlank(board[$(this).attr('id')]))
    })
}

const updateBoard = (board) => {
    fillInBoard(board)
    const gameClass = new gameService()
    if(!gameClass.isGameOver(board)) {
        return
    }

    const gameInfo = {
        id: board.id,
        status: 'finished',
        winner: null
    }
    switch (gameClass.determineWinner(board)) {
        case 1:
            gameInfo.winner = 'owner'
            break;
        case 2:
            gameInfo.winner = 'friend'
            break;
        case 0:
            gameInfo.winner = null
            break;
    }
    sendFinalToServer(gameInfo)
}

const windowPath = location.href.split('/')[location.href.split('/').length-1]
socket.on(`game-${windowPath}`, data => updateBoard(data))

$('td').on('click', createBoardObject)