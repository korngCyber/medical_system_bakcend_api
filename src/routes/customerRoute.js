const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/customerController");
const upload = require("../middlewares/uploadMiddleware");

router.post("", upload.single("cusImage"), CustomerController.create);
router.put("/:id", upload.single("cusImage"), CustomerController.update);
router.get("", CustomerController.getAll);
router.get("/:id", CustomerController.getCustomerById);
router.delete("/:id", CustomerController.remove);

module.exports = router;