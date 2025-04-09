const { Op } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Category = require("../models/categoryModel");

class CategoryService {
  async createCategory(data) {
    return await sequelize.sequelize.transaction(async (t) => {
      return Category.create(data, { transaction: t });
    });
  }

  async getAllCategories(query = {}) {
    const {
      search,
      status,
      sortBy = "created_at",
      sortOrder = "DESC",
      limit = 10,
      page = 1,
    } = query;

    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where.catName = { [Op.like]: `%${search}%` };
    }
    if (status) {
      where.catStatus = status;
    }

    const result = await Category.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder]],
    });

    return {
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: parseInt(page),
      categories: result.rows,
    };
  }
  async getCategoryById(id) {
    return await Category.findOne({ where: { catId: id } });
  }
  async updateCategory(id, data) {
    return await sequelize.sequelize.transaction(async (t) => {
      const category = await Category.findByPk(id);
      if (!category) return null;

      await category.update(data, { transaction: t });
      return category;
    });
  } 
    async deleteCategory(id) {
        return await sequelize.sequelize.transaction(async (t) => {
        const category = await Category.findByPk(id);
        if (!category) return null;
    
        await category.destroy({ transaction: t });
        return category;
        });
    }
}
module.exports = new CategoryService();
