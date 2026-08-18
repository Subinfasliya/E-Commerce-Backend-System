const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");
const { uploadNewImage } = require("../services/storageService");
const createError = require("../utils/createError");
const { deleteImage } = require("../services/cloudinaryService");

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

// Update Product
const updateProduct = async (req, res, next) => {
  let newImagePublicId = null;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid product ID"));
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return next(createError(404, "Product not found"));
    }

    const { name, description, price, discountPrice, category, brand, stock } =
      req.body;

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (price !== undefined) {
      updateData.price = price;
    }

    if (discountPrice !== undefined) {
      updateData.discountPrice = discountPrice;
    }

    if (category !== undefined) {
      updateData.category = category;
    }

    if (brand !== undefined) {
      updateData.brand = brand;
    }

    if (stock !== undefined) {
      updateData.stock = stock;
    }

    let newImage = null;

    if (req.file) {
      const uploadResult = await uploadNewImage(req.file);

      newImage = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };

      newImagePublicId = uploadResult.public_id;

      updateData.image = newImage;
    }

  
    

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    if (newImage) {
      const oldPublicId = existingProduct.image?.public_id;

    
      if (oldPublicId) {

        try {
          await deleteImage(oldPublicId);
        } catch (cloudinaryError) {
          console.error("Failed to delete old cloudinary image");
        }
      }

      newImagePublicId = null;
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (newImagePublicId) {
      console.warn(
        `Database operation failed. Cleaning up orphaned image: ${newImagePublicId}`,
      );
      try {
        await deleteImage(newImagePublicId);
      } catch (cleanupError) {
        console.error(
          "Failed to clean up newly uploaded image after crash",
          cleanupError,
        );
      }
    }
    return next(error);
  }
};
module.exports = { createProduct, getAllProducts, updateProduct };
