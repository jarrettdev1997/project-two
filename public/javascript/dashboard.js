const hideForm = () => {
    $("#friend-username").val('')
}

const addNewGame = (event) => {
    event.preventDefault()

    const friendId = $("#friend-username").val()

    if(!friendId) {
        return
    }

    console.log(friendId)

    fetch('/api/games', {
        method: 'put',
        body: JSON.stringify({
            friend_id: friendId
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then(newGame => {
        window.location = `/games/${newGame.id}`
    })
    .catch(err => {
        console.log(err)
    })
}

$('#cancel-new-game').click(hideForm)
$('#new-game-form').submit(addNewGame)