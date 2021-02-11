async function createBoard() {
    const response = await fetch('api/boards', {
        method: 'post',
        body: JSON.stringify({}),
        headers: {'Content-Type': 'application/jaon'}
    })

    if (response.ok) {
        alert('board created')
        location.reload()
    } else {
        alert('uh oh')
    }
}

async function joinGame(event) {
    if(!event.target.closest('button')) {
        return
    }
    const gameId = event.target.dataset.gameid
    window.location = `/boards/${gameId}`
}

document.getElementById('game-btns').addEventListener("click", joinGame)
document.getElementById('create-board').addEventListener("click", createBoard)