// Importa os módulos necessários
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./CRUD.js'); // Importa as rotas do CRUD de produtos

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta do servidor (usa a variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Middleware para interpretar o corpo das requisições no formato JSON
app.use(bodyParser.json());

// Define o prefixo '/api/products' para as rotas de produtos
app.use('/api/products', productRoutes);

// Inicia o servidor e escuta na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
