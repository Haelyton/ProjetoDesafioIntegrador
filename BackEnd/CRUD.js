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

export function atualizarProduto(id, dadosAtualizados) {
  const produtos = getProdutos();
  const index = produtos.findIndex(prod => prod.id === id);
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...dadosAtualizados, id };
    salvarProdutos(produtos);
    return true;
  }
  return false;
}

export function getProdutoPorId(id) {
  const produtos = getProdutos();
  return produtos.find(prod => prod.id === id);
}

export function deletarProduto(id) {
  let produtos = getProdutos();
  const tamanhoAntes = produtos.length;
  produtos = produtos.filter(prod => prod.id !== id);
  if (produtos.length < tamanhoAntes) {
    salvarProdutos(produtos);
    return true;
  }
  return false;
}