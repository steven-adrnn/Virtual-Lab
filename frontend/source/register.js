document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Kirim data pendaftaran ke backend
        fetch('https://backend-mu-ivory.vercel.app/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('isLoggedIn', 'true'); // Set status login
            window.location.href = 'index.html'; // Arahkan ke beranda
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});