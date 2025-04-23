// src/routes/authRoute.js
const express = require("express");
const AuthController = require("../controller/authController");
const router = express.Router();

router.post("/staff/login", AuthController.loginStaff);
router.post("/login", AuthController.loginCustomer);
router.post("/register", AuthController.registerCustomer);

module.exports = router;