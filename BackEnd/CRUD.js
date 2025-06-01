// Recupera os produtos salvos na variável global (memória temporária), ou inicia com array vazio

let produtos = JSON.parse(global.produtos || '[]'); // memória temporária

// Função para salvar os produtos na variável global (persistência temporária em tempo de execução)
function salvarProdutosLocal(produtosArray) {
  global.produtos = JSON.stringify(produtosArray);
}

// Função para gerar um ID único com base no timestamp atual
function gerarId() {
  return Date.now();
}

// Função principal que lida com requisições HTTP (GET, POST, PUT, DELETE)
export default function handler(req, res) {
  const { method } = req; // Obtém o método HTTP da requisição

  // Retorna todos os produtos (GET)
  if (method === 'GET') {
    return res.status(200).json(produtos);
  }

  // Adiciona um novo produto (POST)
  if (method === 'POST') {
    const novoProduto = { id: gerarId(), ...req.body };
    produtos.push(novoProduto);
    salvarProdutosLocal(produtos);
    return res.status(201).json(novoProduto);
  }

  // Atualiza um produto existente (PUT)
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

  // Remove um produto (DELETE)
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
  
  // Se o método não for permitido, retorna erro 405
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Método ${method} não permitido`);
}
