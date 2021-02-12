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
                    board[square.getAttribute("id")] = 0
                } else {
                    board[square.getAttribute("id")] = 1
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
    console.log(boardData)

    for (var r = 0; r < boardTable.rows.length; r++) {
        for (var cell = 0; cell < boardTable.rows[r].cells.length; cell++) {
            const square = boardTable.rows[r].cells[cell]
            const content = document.querySelector(`#${square.getAttribute("id")} div`)
            if (boardData[square.getAttribute("id")] === 1) {
                content.innerText = 'X'
            } else if (boardData[square.getAttribute("id")] === 2) {
                content.innerText = 'O'
            } else {
                content.innerText = ''
            }
        }
    }
}

const windowPath = location.href.split('/')[location.href.split('/').length-1]
console.log(windowPath)
socket.on(`testing ${windowPath}`, data => console.log(data.message))

socket.on(`update board`, boardData => updateBoard(boardData))

document.getElementById('board-game').addEventListener('click', sendUpdateToServer)