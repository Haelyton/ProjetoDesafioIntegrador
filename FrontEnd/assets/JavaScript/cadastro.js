// Evento de envio do formulário de cadastro de usuário
document.getElementById("form-cadastro-usuario").addEventListener("submit", function(e) {
  e.preventDefault(); // Impede o envio padrão do formulário (evita recarregar a página)

  // Captura e limpa os valores dos campos
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Verifica se algum campo está vazio
  if (!nome || !email || !senha) {
      mostrarMensagem("Preencha todos os campos.", "red");
      return;
  }

  // Recupera os usuários salvos no localStorage (ou cria array vazio se nenhum)
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se já existe um usuário com o mesmo e-mail
  const existe = usuarios.find(user => user.email === email);
  if (existe) {
      mostrarMensagem("E-mail já cadastrado.", "red");
      return;
  }

  // Adiciona novo usuário ao array
  usuarios.push({ nome, email, senha });

  // Salva novamente o array no localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Exibe mensagem de sucesso e reseta o formulário
  mostrarMensagem("Usuário cadastrado com sucesso!", "green");
  document.getElementById("form-cadastro-usuario").reset();
});

// Função auxiliar para exibir mensagens coloridas ao usuário
function mostrarMensagem(texto, cor) {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.style.color = cor;
}

// Evento do botão "logout" para redirecionar para a tela de login
document.getElementById('btn-logout').addEventListener('click', function () {
  window.location.href = 'login.html';
});

// Ao carregar o DOM, ativa o menu hambúrguer para dispositivos móveis
document.addEventListener('DOMContentLoaded', () => {
  const btnMenu = document.getElementById('btn-menu');
  const navbar = document.getElementById('navbar');

  // Alterna a visibilidade do menu ao clicar no botão
  btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
});
