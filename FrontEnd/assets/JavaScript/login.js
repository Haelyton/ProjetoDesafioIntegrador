const form = document.getElementById('login-form');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const btnLogin = document.querySelector('.btn-login');

// Habilita ou desabilita o botão de login conforme os campos
function verificarCampos() {
    btnLogin.disabled = !(usuario.value.trim() && senha.value.trim());
}

usuario.addEventListener('input', verificarCampos);
senha.addEventListener('input', verificarCampos);

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioDigitado = usuario.value.trim();
    const senhaDigitada = senha.value.trim();

    const usuarioEncontrado = usuariosSalvos.find(
        (u) => u.nome === usuarioDigitado && u.senha === senhaDigitada
    );

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        window.location.href = "index.html";
    } else {
        // Apenas exibe uma mensagem visual simples (sem alert)
        const erroMsg = document.createElement('p');
        erroMsg.textContent = "Usuário ou senha incorretos.";
        erroMsg.style.color = "red";
        erroMsg.style.marginTop = "10px";
        form.appendChild(erroMsg);

        // Evita duplicação da mensagem
        setTimeout(() => erroMsg.remove(), 3000);
    }
});
