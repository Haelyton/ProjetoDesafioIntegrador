// Referências aos elementos do DOM
const form = document.getElementById('login-form');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const btnLogin = document.querySelector('.btn-login');

// Função que habilita ou desabilita o botão de login dependendo se os campos estão preenchidos
function verificarCampos() {
    // O botão fica desabilitado se algum dos campos estiver vazio (trim remove espaços)
    btnLogin.disabled = !(usuario.value.trim() && senha.value.trim());
}

// Monitora mudanças nos campos usuário e senha para ativar/desativar botão
usuario.addEventListener('input', verificarCampos);
senha.addEventListener('input', verificarCampos);

// Evento disparado quando o formulário é enviado
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário (recarregar página)

    // Recupera os usuários cadastrados no localStorage (ou um array vazio se não houver)
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Captura os valores digitados pelo usuário
    const usuarioDigitado = usuario.value.trim();
    const senhaDigitada = senha.value.trim();

    // Procura um usuário cujo nome e senha correspondam aos valores digitados
    const usuarioEncontrado = usuariosSalvos.find(
        (u) => u.nome === usuarioDigitado && u.senha === senhaDigitada
    );

    if (usuarioEncontrado) {
        // Se encontrar o usuário, salva os dados no localStorage e redireciona para a página principal
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        window.location.href = "index.html";
    } else {
        // Se não encontrar, exibe uma mensagem de erro simples abaixo do formulário
        const erroMsg = document.createElement('p');
        erroMsg.textContent = "Usuário ou senha incorretos.";
        erroMsg.style.color = "red";
        erroMsg.style.marginTop = "10px";
        form.appendChild(erroMsg);

        // Remove a mensagem após 3 segundos para evitar múltiplas mensagens empilhadas
        setTimeout(() => erroMsg.remove(), 3000);
    }
});
