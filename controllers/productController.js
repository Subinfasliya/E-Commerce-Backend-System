const Product = require("../models/productModel");
const { uploadNewImage } = require("../services/storageService");
const createError = require("../utils/createError");

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, discountPrice, category, brand, stock } =
      req.body;

    if (!req.file) {
      return next(createError(400, "Product image is required"));
    }

    const uploadResult = await uploadNewImage(req.file);

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "Successfully fetched All Products",
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createProduct, getAllProducts };
