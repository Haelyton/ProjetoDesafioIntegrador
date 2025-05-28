document.addEventListener('DOMContentLoaded', () => {
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
  });
  