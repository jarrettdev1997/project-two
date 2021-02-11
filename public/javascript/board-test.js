async function createBoard() {
    const response = await fetch('api/boards', {
        method: 'post',
        body: JSON.stringify({}),
        headers: {'Content-Type': 'application/jaon'}
    })

    if (response.ok) {
        alert('board created')
    } else {
        alert('uh oh')
    }
}

document.getElementById('create-board').addEventListener("click", createBoard)