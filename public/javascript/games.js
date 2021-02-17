var socket = io()

var thisUserId = $('#game-script-tag').attr('data-user')
var firstTurnId = $('#game-script-tag').attr('data-turn')

var isTurn = null;

if(thisUserId === firstTurnId) {
    isTurn = true
} else {
    isTurn = false
    $('.waiting-for-opponent').text("Waiting for opponents move ...")
}

const sendUpdateToServer = function() {
    if (!isTurn) {
        alert("It is not your turn yet!")
        return
    }

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

const sendFinalToServer = (gameInfo, currentUser) => {
    const xUser = { id: $("#user-x").data('userid'), name: $("#user-x").text() }
    const oUser = { id: $("#user-o").data('userid'), name: $("#user-o").text() }

    fetch(`/api/games/final/${gameInfo.id}`, {
        method: 'put',
        body: JSON.stringify({
            status: gameInfo.status,
            winner: gameInfo.winner
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then(() => {
        if (gameInfo.winner === 'owner') {
            if (xUser.id === parseInt(currentUser)) {
                alert(`Congrats! You won the game`)
            } else {
                alert(`Sorry! You lost the game`)
            }
        } else if (gameInfo.winner === 'friend') {
            if (oUser.id === parseInt(currentUser)) {
                alert(`Congrats! You won the game`)
            } else {
                alert(`Sorry! You lost the game`)
            }
        } else {
            alert(`You have both tied the game`)
        }
        window.location = '/'
    })
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

const changeTurn = (currentUser) => {
    const xUser = { id: $("#user-x").data('userid'), name: $("#user-x").text() }
    const oUser = { id: $("#user-o").data('userid'), name: $("#user-o").text() }

    if($('#turn-user').data('userid') === xUser.id) {
        if (parseInt(currentUser) === oUser.id) {
            $('#turn-user').text(`It is your turn`)
            $('.waiting-for-opponent').text()
        } else {
            $('#turn-user').text(`It is ${oUser.name}'s turn`)
            $('.waiting-for-opponent').text("Waiting for opponents move ...")
        }
        $('#turn-user').data('userid', oUser.id)
    } else {
        if (parseInt(currentUser) === xUser.id) {
            $('#turn-user').text(`It is your turn`)
            $('.waiting-for-opponent').text()
        } else {
            $('#turn-user').text(`It is ${xUser.name}'s turn`)
            $('.waiting-for-opponent').text("Waiting for opponents move ...")
        }
        $('#turn-user').data('userid', xUser.id)
    }
}

const updateBoard = (data) => {
    const board = data.board
    
    fillInBoard(board)

    const winner = determineWinner(board)

    let currentUser = localStorage.getItem('user_id')
    if(!currentUser) {
        window.location = '/'
        return
    } 

    if (winner === 0 && !isGameFull(board)) {
        if (parseInt(currentUser) === data.turnId) {
            isTurn = true
        } else {
            isTurn = false
        }
        changeTurn(currentUser)
        return
    }

    isTurn = false
    $('.waiting-for-opponent').text()
    
    const gameInfo = {
        id: $("#board-game").data('gameid'),
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
    sendFinalToServer(gameInfo, currentUser)
}

window.localStorage.setItem('user_id', thisUserId)

const windowPath = location.href.split('/')[location.href.split('/').length-1]
socket.on(`game-${windowPath}`, data => updateBoard(data))

$('td').on('click', sendUpdateToServer)