var socket = io()

const sendUpdateToServer = () => {
    const user = {username: 'dalyd14'}
    const board = {
        upper_left: false,
        upper_mid: false,
        upper_right: true,
        center_left: false,
        center_mid: true,
        center_right: false,
        lower_left: true,
        lower_mid: false,
        lower_right: false,
    }
    const gameId = 1

    socket.emit('clicked box', {user, gameId, board})
}

socket.on('update board', boardData => {
    const boardArray = [
        'upper_left', 
        'upper_mid', 
        'upper_right', 
        'center_left', 
        'center_mid', 
        'center_right', 
        'lower_left', 
        'lower_mid', 
        'lower_right'
    ]

    boardArray.forEach(square => {
        if (boardData[square]) {
            document.getElementById(square).textContent = 'X'
        } else {
            document.getElementById(square).textContent = ''
        }
        
    })
})

document.getElementById('update-board').addEventListener('click', sendUpdateToServer)