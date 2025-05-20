// const Product = require('../models/productModel');
// const { productSchema } = require('../validations/productValidation');

// // Criar produto
// exports.create = (req, res) => {
//   const { error } = productSchema.validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   Product.create(req.body, (err, result) => {
//     if (err) return res.status(500).send(err);
//     res.status(201).send({ id: result.insertId, ...req.body });
//   });
// };
