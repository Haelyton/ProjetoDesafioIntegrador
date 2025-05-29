document.getElementById("form-cadastro-usuario").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
      mostrarMensagem("Preencha todos os campos.", "red");
      return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.find(user => user.email === email);
  if (existe) {
      mostrarMensagem("E-mail já cadastrado.", "red");
      return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mostrarMensagem("Usuário cadastrado com sucesso!", "green");
  document.getElementById("form-cadastro-usuario").reset();
});

function mostrarMensagem(texto, cor) {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.style.color = cor;
}

document.getElementById('btn-logout').addEventListener('click', function () {
  window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', () => {
  const btnMenu = document.getElementById('btn-menu');
  const navbar = document.getElementById('navbar');

  btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
});
