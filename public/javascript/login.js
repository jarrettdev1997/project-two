const userLogin = function(event) {
    event.preventDefault()
    
    const username = $('#username-input').val()
    const password = $('#password-input').val()

    if (username && password) {
        loginUser(username, password)
    }
}

async function loginUser(username, password) {
    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        window.location = '/dashboard'
    } else {
        $('#password-input').val('')
        console.log(response)
        alert(response.statusText)
    }
}

$('.login-form').submit(userLogin)