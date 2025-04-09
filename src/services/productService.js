const sequelize = require("../configs/connectionDB");
const Product = require("../models/productModel");
const ProductImage = require("../models/productImage");
const { Op } = require("sequelize");

class ProductService {
  async createProductWithImages(productData, images) {
    return await sequelize.sequelize.transaction(async (t) => {
      const product = await Product.create(productData, { transaction: t });

      if (images && images.length > 0) {
        const productImages = images.map((image) => ({
          ...image,
          proId: product.proId,
        }));
        await ProductImage.bulkCreate(productImages, { transaction: t });
      }

      return product;
    });
  }

  async getAllProducts(query = {}) {
    const { search, sortBy = "created_at", sortOrder = "DESC", limit = 10, page = 1 } = query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where.proName = { [Op.like]: `%${search}%` };
    }

    const result = await Product.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder]],
      include: [
        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "imageUrl"],
        },
      ],
    });

    return {
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: parseInt(page),
      products: result.rows,
    };
  }

  async getProductById(id) {
    return await Product.findOne({
      where: { proId: id },
      include: [
        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "imageUrl"],
        },
      ],
    });
  }

  async updateProductWithImages(productId, productData, newImages) {
    return await sequelize.sequelize.transaction(async (t) => {
      const product = await Product.findByPk(productId);
      if (!product) return null;

      await product.update(productData, { transaction: t });

      await ProductImage.destroy({
        where: { proId: productId },
        transaction: t,
      });

      if (newImages && newImages.length > 0) {
        const productImages = newImages.map((image) => ({
          ...image,
          proId: productId,
        }));
        await ProductImage.bulkCreate(productImages, { transaction: t });
      }

      return product;
    });
  }

  async deleteProduct(id) {
    return await sequelize.sequelize.transaction(async (t) => {
      const product = await Product.findByPk(id);
      if (!product) return null;

      await product.destroy({ transaction: t });
      return product;
    });
  }
}

module.exports = new ProductService();