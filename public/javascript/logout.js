const logoutUser = async function() {
    console.log("Hi");
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        window.location = '/'
    } else {
        $(".modal-title").text('Error')
        $(".modal-body").find('p').text("Something went wrong.")
        $('#myModal').modal('show');
    }
}

$('#myModal').modal({ show: false})

$('#logout-btn').click(logoutUser)