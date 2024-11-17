document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Kirim data login ke backend
        fetch('https://backend-mu-ivory.vercel.app/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('isLoggedIn', 'true'); // Set status login
            localStorage.setItem('access', data.access); // Simpan token akses
            localStorage.setItem('refresh', data.refresh); // Simpan token refresh
            window.location.href = 'index.html'; // Arahkan ke beranda
            // document.dispatchEvent(new Event('loadQuiz'));

        })
        .catch(error => {
            alert('Username atau password salah');
            console.error('Error:', error);
        });
    });
});