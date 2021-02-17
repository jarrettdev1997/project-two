const userSignup = function(event) {
    event.preventDefault()

    const username = $('#username-input').val()
    const password = $('#password-input').val()

    if (username && password) {
        createUser(username, password)
    } else {
        $(".modal-title").text('Hold Up!')
        $(".modal-body").find('p').text("Please fill in both the username and password to sign-up.")
        $('#myModal').modal('show');
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
        $('#password-input').val('')

        $(".modal-title").text('Error')
        $(".modal-body").find('p').text("Something went wrong. Make sure your password is more than 4 characters long")
        $('#myModal').modal('show');
    }
}

$('#myModal').modal({ show: false})

$('.signup-form').submit(userSignup)