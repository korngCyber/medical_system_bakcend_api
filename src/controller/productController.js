const ProductService = require("../services/productService");

class ProductController {
  static async create(req, res) {
    try {
      const { body, files } = req;

      // Validate uploaded files
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }

      // Extract image URLs
      const images = files.map((file) => ({
        imageUrl: `upload/${file.filename}`,
      }));

      // Create product with images
      const product = await ProductService.createProductWithImages(body, images);

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("Error in create method:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { body, files } = req;

      // Extract new image URLs
      const newImages = files.map((file) => ({
        imageUrl: `upload/${file.filename}`,
      }));

      // Update product and manage images
      const product = await ProductService.updateProductWithImages(
          req.params.id,
          body,
          newImages
      );

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("Error in updateProduct method:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts(req.query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



  static async deleteProduct(req, res) {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
