const userSignup = function(event) {
    event.preventDefault()

    const username = $('#username-input').val()
    const password = $('#password-input').val()

    if (username && password) {
        createUser(username, password)
    } else {
        alert('Please fill in both the username and password to sign-up.')
    }
}

async function createUser(username, password) {
    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {'Content-Type': 'application/json'}
    })

    if(response.ok) {
        window.location = '/dashboard'
    } else {
        console.log(response)
        $('#password-input').val('')
        alert(response.statusText)
    }
}

$('.signup-form').submit(userSignup)