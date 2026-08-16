const Product = require("../models/productModel");

const createProduct = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      message: "Product created successfully",
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
