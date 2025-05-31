let produtos = JSON.parse(global.produtos || '[]'); // memória temporária

function salvarProdutosLocal(produtosArray) {
  global.produtos = JSON.stringify(produtosArray);
}

function gerarId() {
  return Date.now();
}

export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    return res.status(200).json(produtos);
  }

  if (method === 'POST') {
    const novoProduto = { id: gerarId(), ...req.body };
    produtos.push(novoProduto);
    salvarProdutosLocal(produtos);
    return res.status(201).json(novoProduto);
  }

  if (method === 'PUT') {
    const { id, ...dadosAtualizados } = req.body;
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    produtos[index] = { ...produtos[index], ...dadosAtualizados, id };
    salvarProdutosLocal(produtos);
    return res.status(200).json(produtos[index]);
  }

  if (method === 'DELETE') {
    const { id } = req.body;
    const tamanhoAntes = produtos.length;
    produtos = produtos.filter(p => p.id !== id);
    salvarProdutosLocal(produtos);
    if (produtos.length < tamanhoAntes) {
      return res.status(200).json({ message: 'Produto deletado' });
    } else {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Método ${method} não permitido`);
}
