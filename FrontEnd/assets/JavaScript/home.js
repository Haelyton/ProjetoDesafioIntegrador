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

  // Evento de clique para abrir o modal
  card.addEventListener("click", () => {
    abrirModal(produto);
  });

  return card;
}

function abrirModal(produto) {
  document.getElementById("modal-img").src = produto.imagem || "assets/IMG/default.png";
  document.getElementById("modal-nome").textContent = `Nome: ${produto.nome}`;
  document.getElementById("modal-descricao").textContent = `Descrição: ${produto.descricao}`;
  document.getElementById("modal-preco").textContent = `Preço: R$ ${parseFloat(produto.preco).toFixed(2)}`;
  document.getElementById("modal-categoria").textContent = `Categoria: ${produto.categoria || 'Não informado'}`;
  document.getElementById("modal-estoque").textContent = `Estoque: ${produto.estoque}`;
  document.getElementById("modal-status").textContent = `Status: ${produto.status || 'Indefinido'}`;

  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsGrid');
  const produtos = getProdutos();

  container.innerHTML = ''; // limpa o conteúdo anterior

  produtos.forEach(produto => {
    const card = criarCardProduto(produto);
    container.appendChild(card);
  });

  // Botão de fechar
  document.querySelector(".close-btn").addEventListener("click", fecharModal);

  // Clique fora do conteúdo fecha o modal
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
      fecharModal();
    }
  });
});
