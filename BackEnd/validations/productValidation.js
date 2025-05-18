const Joi = require('joi');

const productSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  descricao: Joi.string().allow('', null),
  preco: Joi.number().positive().required(),
  status: Joi.string().valid('ativo', 'inativo').default('ativo'),
  id_categoria: Joi.number().integer().required()
});

module.exports = { productSchema };
