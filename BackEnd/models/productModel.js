const db = require('./db'); // Certifique-se de que o caminho está certo

const Product = {
  // Criar produto
  create: (produto, callback) => {
    const sql = `
      INSERT INTO produto (nome, descricao, preco, status, id_categoria)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      produto.nome,
      produto.descricao || null,
      produto.preco,
      produto.status || 'ativo',
      produto.id_categoria
    ];

    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },
};

module.exports = Product;
