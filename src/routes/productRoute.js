const express = require("express");
const ProductController = require("../controller/productController");

const router = express.Router();

// Define routes
router.post("/", ProductController.create);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
