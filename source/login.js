document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi login yang sukses
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Anda bisa menambahkan logika untuk memverifikasi kredensial pengguna di sini

        // Jika login berhasil
        localStorage.setItem('isLoggedIn', 'true'); // Set status login
        window.location.href = 'index.html'; // Arahkan ke beranda
    });
});