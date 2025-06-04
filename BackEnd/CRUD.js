const express = require('express');
const router = express.Router();

// Produtos armazenados em memória (recuperados do escopo global, se existir)
let produtos = JSON.parse(global.produtos || '[]');

/**
 * Salva os produtos no escopo global como string JSON.
 * @param {Array} produtosArray - Lista de produtos a ser salva.
 */
function salvarProdutosLocal(produtosArray) {
  global.produtos = JSON.stringify(produtosArray);
}

/**
 * Gera um ID único com base no timestamp atual.
 * @returns {number} - ID gerado.
 */
function gerarId() {
  return Date.now();
}

// ======================
// ROTAS DA API DE PRODUTOS
// ======================

/**
 * GET /api/products
 * Retorna todos os produtos.
 */
router.get('/', (req, res) => {
  res.status(200).json(produtos);
});

/**
 * POST /api/products
 * Adiciona um novo produto.
 * Espera os dados no corpo da requisição.
 */
router.post('/', (req, res) => {
  const novoProduto = { id: gerarId(), ...req.body };
  produtos.push(novoProduto);
  salvarProdutosLocal(produtos);
  res.status(201).json(novoProduto);
});

/**
 * PUT /api/products/:id
 * Atualiza um produto existente pelo ID.
 * Espera os dados atualizados no corpo da requisição.
 */
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const dadosAtualizados = req.body;
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  produtos[index] = { ...produtos[index], ...dadosAtualizados, id };
  salvarProdutosLocal(produtos);
  res.status(200).json(produtos[index]);
});

/**
 * DELETE /api/products/:id
 * Remove um produto existente pelo ID.
 */
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const tamanhoAntes = produtos.length;

  produtos = produtos.filter(p => p.id !== id);
  salvarProdutosLocal(produtos);

  if (produtos.length < tamanhoAntes) {
    res.status(200).json({ message: 'Produto deletado' });
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
