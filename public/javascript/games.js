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

    const gameId = boardTable.data('gameid')

    fetch(`/api/boards/${gameId}`, {
        method: 'put',
        body: JSON.stringify({
            cellClicked: clickedId
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then()
    .catch(err => {
        console.log(err)
    })
}

const sendFinalToServer = (gameInfo) => {
    console.log('game finished!', gameInfo)
    fetch(`/api/games/final/${gameInfo.id}`, {
        method: 'put',
        body: JSON.stringify({
            status: gameInfo.status,
            winner: gameInfo.winner
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then()
    .catch(err => {
        console.log(err)
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
        $(this).find('span').text(XorOorBlank(board[$(this).attr('id')]))
    })
}

const updateBoard = (board) => {
    console.log('here', board)
    fillInBoard(board)
    const winner = determineWinner(board)
    if (winner === 0 && !isGameFull) {
        return
    }
    const gameInfo = {
        id: board.id,
        status: 'finished',
        winner: null
    }
    switch (winner) {
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

$('td').on('click', sendUpdateToServer)