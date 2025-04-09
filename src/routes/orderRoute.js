const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

router.post("", OrderController.createOrder);
router.get("", OrderController.getAllOrders);
router.get("/:id", OrderController.getOneOrder);
router.put("/:id", OrderController.updateOrder);

router.delete("/:id", OrderController.deleteOrder);
router.get("/:id", OrderController.getOrderById);

module.exports = router;