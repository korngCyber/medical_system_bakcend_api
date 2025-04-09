const { Op } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Product = require("../models/productModel");

class ProductService {
  async createProduct(data) {
    return await sequelize.sequelize.transaction(async (t) => {
      return Product.create(data, {transaction: t});
    });
  }

  async getAllProducts(query = {}) {
    const {
      search,
      status,
      catId,
      sortBy = "created_at",
      sortOrder = "DESC",
      limit = 10,
      page = 1,
    } = query;

    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where.proName = { [Op.like]: `%${search}%` };
    }
    if (status) {
      where.proStatus = status;
    }
    if (catId) {
      where.catId = catId;
    }

    const result = await Product.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder]],
    });

    return {
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: parseInt(page),
      products: result.rows,
    };
  }

  async getProductById(id) {
    return await Product.findOne({ where: { proId: id } });
  }

  async updateProduct(id, data) {
    return await sequelize.sequelize.transaction(async (t) => {
      const product = await Product.findByPk(id);
      if (!product) return null;

      await product.update(data, { transaction: t });
      return product;
    });
  }

  async deleteProduct(id) {
    return await sequelize.sequelize.transaction(async (t) => {
      const product = await Product.findByPk(id);
      if (!product) return null;

      await product.destroy({ transaction: t }); // Soft delete
      return true;
    });
  }
}

module.exports = new ProductService();
