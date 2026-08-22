const express = require('express');
const router = express.Router();

const productController = require('../Controllers/ProductController');

router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id', productController.getProductById);
router.get('/products', productController.getAllProducts);


module.exports = router;