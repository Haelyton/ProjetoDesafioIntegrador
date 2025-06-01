const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./CRUD.js'); // Importa as rotas do CRUD

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
