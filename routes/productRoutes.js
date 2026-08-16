const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const { adminAccessOnly } = require("../middlewares/adminMiddleware");
const validateBody = require("../middlewares/validateMiddleware");
const { createProductSchema } = require("../validations/productValidate");

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  protect,
  adminAccessOnly,
  validateBody(createProductSchema),
  createProduct,
);

module.exports = router;
