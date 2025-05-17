const form = document.getElementById('login-form');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const btnLogin = document.querySelector('.btn-login');

function verificarCampos() {
    if (usuario.value.trim() !== "" && senha.value.trim() !== "") {
        btnLogin.disabled = false;
    } else {
        btnLogin.disabled = true;
    }
}

usuario.addEventListener('input', verificarCampos);
senha.addEventListener('input', verificarCampos);

form.addEventListener('submit', function(event) {
    if (usuario.value.trim() === "" || senha.value.trim() === "") {
        event.preventDefault();
        alert("Preencha todos os campos.");
    } else {
        alert("Login realizado com sucesso!");
    }
});
