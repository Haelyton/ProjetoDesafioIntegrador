// funções CRUD no localStorage

function gerarId() {
  return Date.now();
}

export function getProdutos() {
  return JSON.parse(localStorage.getItem("produtos")) || [];
}

function salvarProdutos(produtos) {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function criarProduto(produto) {
  const produtos = getProdutos();
  produto.id = gerarId();
  produtos.push(produto);
  salvarProdutos(produtos);
}

// (Você pode colocar funções para read, update e delete aqui depois)
