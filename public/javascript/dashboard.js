const hideForm = () => {
    $("#friend-username").val('')
}

const addNewGame = (event) => {
    event.preventDefault()

    const friendUsername = $("#friend-username").val().trim()

    if(!friendUsername) {
        return
    }

    fetch('/api/games', {
        method: 'post',
        body: JSON.stringify({
            friend_username: friendUsername
        }),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        return response.json()
    })
    .then(newGame => {
        if(newGame.statusText) {
            alert(newGame.statusText)
            return
        }
        console.log(newGame)
        window.location = `/games/${newGame.id}`
    })
    .catch(err => {
        console.log(err)
    })
}

$('#cancel-new-game').click(hideForm)
$('#new-game-form').submit(addNewGame)