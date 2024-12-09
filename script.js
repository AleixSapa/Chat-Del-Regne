// Emmagatzemar les dades de registre
var users = JSON.parse(localStorage.getItem("users")) || [];

// Mostra la secció de registre
document.getElementById('register-btn').addEventListener('click', function () {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});

// Mostra la secció d'inici de sessió
document.getElementById('login-btn').addEventListener('click', function () {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

// Tornar a la pantalla inicial des del registre
document.getElementById('back-to-start').addEventListener('click', function () {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('start-section').style.display = 'block';
});

// Tornar a la pantalla inicial des de l'inici de sessió
document.getElementById('back-to-start-login').addEventListener('click', function () {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('start-section').style.display = 'block';
});

// Comprovació si l'usuari ja està registrat
function checkIfUserExists(name, email) {
    return users.find(user => user.name === name || user.email === email);
}

// Registre de l'usuari
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    var name = document.getElementById('register-name').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    
    if (!checkIfUserExists(name, email)) {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuari registrat correctament!');
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    } else {
        alert('L\'usuari ja existeix.');
    }
});

// Inici de sessió
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    var name = document.getElementById('login-name').value;
    var password = document.getElementById('login-password').value;
    
    var user = users.find(user => user.name === name && user.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('chat-section').style.display = 'block';
    } else {
        alert('Nom o contrasenya incorrectes');
    }
});

// Mostrar missatges
document.getElementById('send-message').addEventListener('click', function () {
    var message = document.getElementById('message-input').value;
    if (message) {
        var messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        document.getElementById('messages').appendChild(messageDiv);
        document.getElementById('message-input').value = '';
    }
});

// Recordar l'usuari
window.onload = function () {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('start-section').style.display = 'none';
        document.getElementById('chat-section').style.display = 'block';
    } else {
        document.getElementById('start-section').style.display = 'block';
    }
};
