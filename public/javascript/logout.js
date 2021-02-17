const logoutUser = async function() {
    console.log("Hi");
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        window.location = '/'
    } else {
        alert(response.statusText)
    }
}

$('#logout-btn').click(logoutUser)