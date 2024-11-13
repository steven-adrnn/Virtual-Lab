document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi pendaftaran yang sukses
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Anda bisa menambahkan logika untuk menyimpan data pengguna di sini

        // Jika pendaftaran berhasil
        localStorage.setItem('isLoggedIn', 'true'); // Set status login
        window.location.href = 'index.html'; // Arahkan ke beranda
    });
});