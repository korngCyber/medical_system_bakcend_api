const CategoryService = require("../services/categoriesService");

class CategoryController{
    async create(req, res, next) {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(200).json({
                message: "Category created successfully",
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const result = await CategoryService.getAllCategories(req.query);
            res.status(200).json({
                message: "Categories retrieved successfully",
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }
    async getByID(req, res, next) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });

            res.status(200).json({
                message: "Category retrieved successfully",
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const updated = await CategoryService.updateCategory(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: "Category not found" });

            res.status(200).json({
                message: "Category updated successfully",
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            const deleted = await CategoryService.deleteCategory(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Category not found" });

            res.status(200).json({
                message: "Category deleted successfully",
                data: deleted,
            });
        } catch (error) {
            next(error);
        }
    }
    async deleteMany(req, res, next) {
        try {
            const ids = req.body.ids;
            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ message: "Invalid input" });
            }

            const deleted = await CategoryService.deleteManyCategories(ids);
            res.status(200).json({
                message: "Categories deleted successfully",
                data: deleted,
            });
        } catch (error) {
            next(error);
        }
    }
    async deleteAll(req, res, next) {
        try {
            const deleted = await CategoryService.deleteAllCategories();
            res.status(200).json({
                message: "All categories deleted successfully",
                data: deleted,
            });
        } catch (error) {
            next(error);
        }
    }
    async getBySlug(req, res, next) {
        try {
            const category = await CategoryService.getCategoryBySlug(req.params.slug);
            if (!category) return res.status(404).json({ message: "Category not found" });

            res.status(200).json({
                message: "Category retrieved successfully",
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }
    async getBySlugWithProducts(req, res, next) {
        try {
            const category = await CategoryService.getCategoryBySlugWithProducts(req.params.slug);
            if (!category) return res.status(404).json({ message: "Category not found" });

            res.status(200).json({
                message: "Category retrieved successfully",
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new CategoryController();
