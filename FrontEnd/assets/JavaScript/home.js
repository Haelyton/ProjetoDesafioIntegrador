import { getProdutos, atualizarProduto, deletarProduto } from '/ProjetoDesafioIntegrador/BackEnd/CRUD.js';

let produtoAtual = null;

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
  produtoAtual = produto;

  document.getElementById("modal").style.display = "flex";

  // Preenche campos
  document.getElementById("modal-img-preview").src = produto.imagem || "assets/IMG/default.png";
  document.getElementById("modal-nome").value = produto.nome;
  document.getElementById("modal-descricao").value = produto.descricao;
  document.getElementById("modal-preco").value = produto.preco;
  document.getElementById("modal-categoria").value = produto.categoria || '';
  document.getElementById("modal-estoque").value = produto.estoque;
  document.getElementById("modal-status").value = produto.status || "ativo";

  // Limpar input de imagem (para evitar mostrar arquivo anterior)
  document.getElementById("modal-img-input").value = "";
}

// Fechar modais
document.querySelector(".close-btn").addEventListener("click", () => fecharModal());

window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal")) fecharModal();
  if (e.target === document.getElementById("modal-confirm-delete")) fecharModalDelete();
});

function fecharModal() {
  document.getElementById("modal").style.display = "none";
  produtoAtual = null;
}

function fecharModalDelete() {
  document.getElementById("modal-confirm-delete").style.display = "none";
}

// Atualizar produto
document.getElementById("form-editar-produto").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!produtoAtual) return;

  const file = document.getElementById("modal-img-input").files[0];

  const atualizarEFechar = (imagemBase64) => {
    const dadosAtualizados = {
      nome: document.getElementById("modal-nome").value.trim(),
      descricao: document.getElementById("modal-descricao").value.trim(),
      preco: parseFloat(document.getElementById("modal-preco").value),
      categoria: document.getElementById("modal-categoria").value.trim(),
      estoque: parseInt(document.getElementById("modal-estoque").value),
      status: document.getElementById("modal-status").value,
      imagem: imagemBase64 || produtoAtual.imagem
    };

    atualizarProduto(produtoAtual.id, dadosAtualizados);
    fecharModal();
    carregarProdutos();
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      atualizarEFechar(event.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    atualizarEFechar(null);
  }
});

// Excluir produto
document.getElementById("btn-deletar-produto").addEventListener("click", () => {
  if (!produtoAtual) return;
  document.getElementById("modal-confirm-delete").style.display = "flex";
});

document.getElementById("confirm-delete-btn").addEventListener("click", () => {
  if (!produtoAtual) return;
  deletarProduto(produtoAtual.id);
  fecharModalDelete();
  fecharModal();
  carregarProdutos();
});

document.getElementById("cancel-delete-btn").addEventListener("click", () => fecharModalDelete());

// Renderizar produtos no grid
function renderizarProdutos(produtos) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";
  produtos.forEach(prod => {
    grid.appendChild(criarCardProduto(prod));
  });
}

// Carregar todos os produtos
function carregarProdutos() {
  const produtos = getProdutos() || [];
  renderizarProdutos(produtos);
}

// Campo de busca por nome (filtro dinâmico)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.trim().toLowerCase();
    const produtos = getProdutos() || [];

    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    renderizarProdutos(filtrados);
  });
}

// Carregar ao abrir a página
window.addEventListener("load", carregarProdutos);

  const toggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  document.getElementById('btn-logout').addEventListener('click', function () {
    // Redireciona para a página de login
    window.location.href = 'login.html';
});

