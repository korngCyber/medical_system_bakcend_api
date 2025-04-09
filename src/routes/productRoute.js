const express = require("express");
const ProductController = require("../controller/productController");
const uploadMultiple = require("../middlewares/uploadMultipleMiddleware");

const router = express.Router();

// Define routes
router.post("", uploadMultiple, ProductController.create);
router.put("/:id", uploadMultiple, ProductController.updateProduct);
router.get("", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;