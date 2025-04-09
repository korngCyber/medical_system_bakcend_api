const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('', productController.create);
router.get('', productController.getAll);
router.get('/:id', productController.getOne);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
