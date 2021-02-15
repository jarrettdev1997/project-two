var socket = io()

const sendUpdateToServer = (event) => {
    const boardTable = document.getElementById("board-game")

    if(!event.target.closest('td')) {
        console.log('you didnt touch a cell')
        return
    }

    const cellClickedId = event.target.closest('td').getAttribute('id');

    const gameId = boardTable.dataset.gameid

    if(document.getElementById(cellClickedId).innerText === '') {
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
}

const windowPath = location.href.split('/')[location.href.split('/').length-1]
socket.on(`testing ${windowPath}`, data => console.log({ fromSocket: data }))

document.getElementById('board-game').addEventListener('click', sendUpdateToServer)