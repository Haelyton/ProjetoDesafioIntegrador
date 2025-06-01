const express = require('express');
const router = express.Router();

// produtos em memória
let produtos = JSON.parse(global.produtos || '[]');

function salvarProdutosLocal(produtosArray) {
  global.produtos = JSON.stringify(produtosArray);
}

function gerarId() {
  return Date.now();
}

// GET /api/products
router.get('/', (req, res) => {
  res.status(200).json(produtos);
});

// POST /api/products
router.post('/', (req, res) => {
  const novoProduto = { id: gerarId(), ...req.body };
  produtos.push(novoProduto);
  salvarProdutosLocal(produtos);
  res.status(201).json(novoProduto);
});

// PUT /api/products/:id
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

// DELETE /api/products/:id
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

module.exports = router;
