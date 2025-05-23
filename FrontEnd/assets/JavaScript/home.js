// Caminho atualizado para funcionar com import/export corretamente
import { getProdutos } from '/ProjetoDesafioIntegrador/BackEnd/CRUD.js';


function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = produto.imagem || "assets/IMG/default.png";
  img.alt = produto.nome;

  const h3 = document.createElement("h3");
  h3.textContent = produto.nome;

  const pDesc = document.createElement("p");
  pDesc.textContent = produto.descricao;

  const pPreco = document.createElement("p");
  pPreco.textContent = `Preço: R$ ${parseFloat(produto.preco).toFixed(2)}`;

  const pEstoque = document.createElement("p");
  pEstoque.textContent = `Estoque: ${produto.estoque}`;

  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(pDesc);
  card.appendChild(pPreco);
  card.appendChild(pEstoque);

  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsGrid');
  const produtos = getProdutos();

  container.innerHTML = ''; // limpa o conteúdo anterior

  produtos.forEach(produto => {
    const card = criarCardProduto(produto);
    container.appendChild(card);
  });
});
