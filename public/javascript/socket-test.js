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

socket.on(`update board`, boardData => updateBoard(boardData))