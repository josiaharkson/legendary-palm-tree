const express = require("express");
const router = express.Router();

// Controller Middleware
const {
  login,
  register,
  authenticate,
  resetPassword,
  changePassword,
  changeBankDetails,
} = require("../controllers/user");

// Validation Middleware
const {
  ValidateLogin,
  ValidateRegister,
  ValidateBankDetails,
} = require("../validation/user");

// AUTH Middleware
const Auth = require("../middlewares/auth");

// POST - Login
router.post("/login", ValidateLogin, login);

// POST - Register
router.post("/register", ValidateRegister, register);

// GET - Authenticate Single User
router.get("/authenticate", Auth.hasToken, authenticate);

// POST - Reset Password (FOR FORGET PASSWORDS)
router.post("/password/reset", resetPassword);

// POST - Change Passsword
router.post("/password/change", changePassword);

// POST - Change Bank Details
router.post("/bank/edit", ValidateBankDetails, changeBankDetails);

module.exports = router;
