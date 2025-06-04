// URL da API para comunicação com o back-end
const API_URL = "https://projetodesafiointegrador.onrender.com/api/products";

// Variável para armazenar temporariamente o produto selecionado
let produtoAtual = null;

/**
 * Cria visualmente um card de produto com os dados fornecidos.
 * @param {Object} produto - Objeto com os dados do produto.
 * @returns {HTMLElement} - Elemento HTML do card criado.
 */
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

  // Ao clicar no card, abre o modal de edição com os dados do produto
  card.addEventListener("click", () => {
    abrirModal(produto);
  });

  return card;
}

/**
 * Preenche e exibe o modal de edição com os dados do produto selecionado.
 * @param {Object} produto - Produto a ser exibido no modal.
 */
function abrirModal(produto) {
  produtoAtual = produto;

  document.getElementById("modal").style.display = "flex";

  document.getElementById("modal-img-preview").src = produto.imagem || "assets/IMG/default.png";
  document.getElementById("modal-nome").value = produto.nome;
  document.getElementById("modal-descricao").value = produto.descricao;
  document.getElementById("modal-preco").value = produto.preco;
  document.getElementById("modal-categoria").value = produto.categoria || '';
  document.getElementById("modal-estoque").value = produto.estoque;
  document.getElementById("modal-status").value = produto.status || "ativo";

  document.getElementById("modal-img-input").value = "";
}

// Fecha o modal de edição
function fecharModal() {
  document.getElementById("modal").style.display = "none";
  produtoAtual = null;
}

// Fecha o modal de confirmação de exclusão
function fecharModalDelete() {
  document.getElementById("modal-confirm-delete").style.display = "none";
}

// Botão de fechar modal
document.querySelector(".close-btn").addEventListener("click", fecharModal);

// Fecha os modais ao clicar fora da área de conteúdo
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal")) fecharModal();
  if (e.target === document.getElementById("modal-confirm-delete")) fecharModalDelete();
});

// Submissão do formulário de edição do produto
document.getElementById("form-editar-produto").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!produtoAtual) return;

  const file = document.getElementById("modal-img-input").files[0];

  const dadosAtualizados = {
    nome: document.getElementById("modal-nome").value.trim(),
    descricao: document.getElementById("modal-descricao").value.trim(),
    preco: parseFloat(document.getElementById("modal-preco").value),
    categoria: document.getElementById("modal-categoria").value.trim(),
    estoque: parseInt(document.getElementById("modal-estoque").value),
    status: document.getElementById("modal-status").value,
    imagem: produtoAtual.imagem
  };

  // Se uma nova imagem for enviada, converte para Base64
  if (file) {
    const reader = new FileReader();
    reader.onload = async function (event) {
      dadosAtualizados.imagem = event.target.result;
      await atualizarProduto(produtoAtual.id, dadosAtualizados);
    };
    reader.readAsDataURL(file);
  } else {
    await atualizarProduto(produtoAtual.id, dadosAtualizados);
  }

  fecharModal();
  carregarProdutos(); // Recarrega a lista de produtos
});

// Ao clicar no botão de deletar, exibe o modal de confirmação
document.getElementById("btn-deletar-produto").addEventListener("click", () => {
  if (!produtoAtual) return;
  document.getElementById("modal-confirm-delete").style.display = "flex";
});

// Confirma a exclusão do produto
document.getElementById("confirm-delete-btn").addEventListener("click", async () => {
  if (!produtoAtual) return;
  await deletarProduto(produtoAtual.id);
  fecharModalDelete();
  fecharModal();
  carregarProdutos();
});

// Cancela a exclusão do produto
document.getElementById("cancel-delete-btn").addEventListener("click", fecharModalDelete);

/**
 * Renderiza os produtos na interface como cards.
 * @param {Array} produtos - Lista de produtos a serem renderizados.
 */
function renderizarProdutos(produtos) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";
  produtos.forEach(prod => grid.appendChild(criarCardProduto(prod)));
}

/**
 * Busca os produtos da API e renderiza na tela.
 */
async function carregarProdutos() {
  try {
    const response = await fetch(API_URL);
    const produtos = await response.json();
    renderizarProdutos(produtos);
    produtosOriginais = produtos; // Armazena para pesquisa
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

/**
 * Atualiza um produto na API.
 * @param {number} id - ID do produto.
 * @param {Object} dados - Dados atualizados do produto.
 */
async function atualizarProduto(id, dados) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
  }
}

/**
 * Deleta um produto da API.
 * @param {number} id - ID do produto.
 */
async function deletarProduto(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
  }
}

// Armazena os produtos originais para pesquisa
let produtosOriginais = [];

// Lógica do campo de pesquisa
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.trim().toLowerCase();
    const filtrados = produtosOriginais.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(filtrados);
  });
}

// Carrega os produtos ao abrir a página
window.addEventListener("load", carregarProdutos);

// Menu hamburguer (para mobile)
const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  toggle.classList.toggle('active');
});

// Botão de logout redireciona para a página de login
document.getElementById('btn-logout').addEventListener('click', function () {
  window.location.href = 'login.html';
});
