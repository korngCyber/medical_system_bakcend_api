const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/productController");

router.post("", CategoryController.create);
router.get("", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);   


module.exports = router;