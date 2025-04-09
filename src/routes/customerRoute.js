const express = require("express");
const router = express.Router();
const Customer = require("../controller/customerController");

router.post("", Customer.create);
router.get("", Customer.getAll);
router.get("/:id", Customer.getOne);
router.put("/:id", Customer.update);
router.delete("/:id", Customer.remove);

module.exports = router;