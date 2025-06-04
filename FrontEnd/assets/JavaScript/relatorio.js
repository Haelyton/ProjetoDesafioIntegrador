// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

  // Seleciona os elementos do menu hamburguer
  const btnMenu = document.getElementById('btn-menu');
  const navbar = document.getElementById('navbar');

  // Adiciona evento de clique para abrir/fechar o menu
  btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Referências à tabela e ao total geral
  const corpoTabela = document.getElementById('tabela-corpo');
  const totalGeral = document.getElementById('total-geral');

  /**
   * Função responsável por buscar os produtos da API
   * e preencher a tabela com os dados, calculando o total de estoque.
   */
  async function carregarProdutos() {
    try {
      const response = await fetch('https://projetodesafiointegrador.onrender.com/api/products');
      if (!response.ok) throw new Error('Erro ao buscar produtos');

      const produtos = await response.json();

      corpoTabela.innerHTML = ''; // Limpa o conteúdo da tabela
      let totalEstoque = 0;

      // Itera sobre os produtos e adiciona cada um à tabela
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

      // Exibe o valor total no elemento correspondente
      totalGeral.textContent = `R$ ${totalEstoque.toFixed(2)}`;

    } catch (error) {
      console.error('Erro ao carregar produtos:', error);

      // Caso ocorra erro, mostra mensagem na tabela
      corpoTabela.innerHTML = '<tr><td colspan="4">Erro ao carregar produtos.</td></tr>';
      totalGeral.textContent = 'R$ 0.00';
    }
  }

  // Chama a função ao carregar a página
  carregarProdutos();

  // Evento de logout: redireciona para a tela de login
  document.getElementById('btn-logout').addEventListener('click', () => {
    window.location.href = 'login.html';
  });

});
