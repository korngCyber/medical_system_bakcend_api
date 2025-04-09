const productService = require("../services/productService");

class ProductController {
  async create(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(200).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await productService.getAllProducts(req.query);
      res.status(200).json({
        message: "Products retrieved successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      res.status(200).json({
        message: "Product retrieved successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await productService.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Product not found" });

      res.status(200).json({
        message: "Product updated successfully",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const deleted = await productService.deleteProduct(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Product not found" });

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
