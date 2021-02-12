async function createGame() {
    const response = await fetch('api/games', {
        method: 'post',
        body: JSON.stringify({}),
        headers: {'Content-Type': 'application/jaon'}
    })

    if (response.ok) {
        alert('game created')
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
    window.location = `/games/${gameId}`
}

document.getElementById('game-btns').addEventListener("click", joinGame)
// document.getElementById('create-board').addEventListener("click", createGame)