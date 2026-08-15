const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authentication");
const validateBody = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema } = require("../validations/authValidate");
const router = express.Router();

router.post("/register", validateBody(registerSchema), registerController);
router.post("/login", validateBody(loginSchema), loginController);

module.exports = router;
