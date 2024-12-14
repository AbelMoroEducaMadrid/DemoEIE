// login.js

// Simulación de usuarios
const usuarios = [
    { username: "admin", password: "1234" },
    { username: "user", password: "abcd" }
];

// Gestión de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuarioValido = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
        window.location.href = 'dashboard.html'; // Redirige al dashboard
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});
