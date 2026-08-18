const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const { adminAccessOnly } = require("../middlewares/adminMiddleware");
const validateBody = require("../middlewares/validateMiddleware");
const { createProductSchema } = require("../validations/productValidate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  protect,
  adminAccessOnly,
  upload.single("image"),
  validateBody(createProductSchema),
  createProduct,
);
router.put("/:id", protect,upload.single("image"), adminAccessOnly, updateProduct)

module.exports = router;

