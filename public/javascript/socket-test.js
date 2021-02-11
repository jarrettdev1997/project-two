
var socket = io()

const sendUpdateToServer = (event) => {
    const boardTable = document.getElementById("board-game")

    if(!event.target.closest('td')) {
        console.log('you didnt touch a cell')
        return
    }

    const cellClicked = event.target.closest('td').getAttribute('id');

    const user = {username: 'dalyd14'}
    const gameId = boardTable.dataset.gameid
    const board = {};

    for (var r = 0; r < boardTable.rows.length; r++) {
        for (var cell = 0; cell < boardTable.rows[r].cells.length; cell++) {
            const square = boardTable.rows[r].cells[cell]
            if(square.getAttribute("id") === cellClicked) {
                if(square.innerText === 'X') {
                    board[square.getAttribute("id")] = false
                } else {
                    board[square.getAttribute("id")] = true
                }
            }
        }
    }
    
    socket.emit('clicked box', {user, gameId, board}, (response) => {
        if (!response.ok) {
            alert(response.message)
        }
    })
}

const updateBoard = (boardData) => {
    const boardTable = document.getElementById("board-game")

    for (var r = 0; r < boardTable.rows.length; r++) {
        for (var cell = 0; cell < boardTable.rows[r].cells.length; cell++) {
            const square = boardTable.rows[r].cells[cell]
            const content = document.querySelector(`#${square.getAttribute("id")} div`)
            if (boardData[square.getAttribute("id")]) {
                content.innerText = 'X'
            } else {
                content.innerText = ''
            }
        }
    }
}

socket.on('update board', boardData => updateBoard(boardData))

document.getElementById('board-game').addEventListener('click', sendUpdateToServer)