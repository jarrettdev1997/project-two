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

const windowPath = location.href.split('/')[location.href.split('/').length-1]
socket.on(`game-${windowPath}`, data => console.log({ fromSocket: data }))

$('td').on('click', sendUpdateToServer)