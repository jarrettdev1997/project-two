async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location = '/';
      } else {
        alert(response.statusText);
      }
    }
  }

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);