document.addEventListener('DOMContentLoaded', () => {
  // Ativar/desativar menu hamburguer
  const btnMenu = document.getElementById('btn-menu');
  const navbar = document.getElementById('navbar');

  btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  const corpoTabela = document.getElementById('tabela-corpo');
  const totalGeral = document.getElementById('total-geral');

  async function carregarProdutos() {
    try {
      const response = await fetch('https://projetodesafiointegrador.onrender.com/api/products');
      if (!response.ok) throw new Error('Erro ao buscar produtos');

      const produtos = await response.json();

      corpoTabela.innerHTML = ''; // limpa tabela
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

    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      corpoTabela.innerHTML = '<tr><td colspan="4">Erro ao carregar produtos.</td></tr>';
      totalGeral.textContent = 'R$ 0.00';
    }
  }

  carregarProdutos();

  // Botão logout
  document.getElementById('btn-logout').addEventListener('click', () => {
    window.location.href = 'login.html';
  });
});
