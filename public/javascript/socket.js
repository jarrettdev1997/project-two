var socket = io()


    //console.log("test test test " + event.target.closest('td').getAttribute("cell"));
    

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
    const cellNumber = event.target.closest('td').getAttribute("cell"); 
    boardTable.dataset.newMove = cellNumber;
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
    console.log("xxx" + JSON.stringify(board));
    socket.emit('clicked box', {user, gameId, board}, (response) => {
        if (!response.ok) {
            alert(response.message)
        }
    })
}

const updateBoard = (boardData) => {
    const boardTable = document.getElementById("board-game");
    console.log("updated board data" + JSON.stringify(boardData));
    $.ajax({
        url: "http://localhost:3001/api/boards/" + boardData.id,
        type: 'PUT',
        dataType: "json",
        data: JSON.stringify(boardData),
        success: function boardUpdated(resp){
            //console.log("success" + JSON.stringify(resp));
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
    }); 
    
};

socket.on('update board', boardData => updateBoard(boardData));

document.getElementById('board-game').addEventListener('click', sendUpdateToServer)