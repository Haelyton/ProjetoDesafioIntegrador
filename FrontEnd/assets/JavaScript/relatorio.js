document.addEventListener('DOMContentLoaded', () => {
  // Ativar/desativar menu hamburguer
  const btnMenu = document.getElementById('btn-menu');
  const navbar = document.getElementById('navbar');

  btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Preencher tabela com produtos do localStorage
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const corpoTabela = document.getElementById('tabela-corpo');
  const totalGeral = document.getElementById('total-geral');

  let totalEstoque = 0;

  produtos.forEach(produto => {
    const preco = parseFloat(produto.preco) || 0;
    const estoque = parseInt(produto.estoque) || 0;
    const total = preco * estoque;
    totalEstoque += total;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${estoque}</td>
      <td>R$ ${preco.toFixed(2)}</td>
      <td>R$ ${total.toFixed(2)}</td>
    `;

    corpoTabela.appendChild(tr);
  });

  totalGeral.textContent = `R$ ${totalEstoque.toFixed(2)}`;

  // Botão logout
  document.getElementById('btn-logout').addEventListener('click', () => {
    window.location.href = 'login.html';
  });
});
