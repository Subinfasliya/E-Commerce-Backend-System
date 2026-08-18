const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().trim().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 3 characters",
    "string.max": "Product name not exceed 50 characters ",
    "any.required": "Product name is required",
  }),

  description: Joi.string().min(10).max(1000).required().trim().messages({
    "string.empty": "Product description is required",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description not exceed 120 characters ",
    "any.required": "Description is required",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required",
  }),

  discountPrice: Joi.number().positive().precision(2),

  category: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Category is required",
    "string.min": "Category must be at least 2 characters",
    "string.max": "Category must not exceed 50 characters",
    "any.required": "Category is required",
  }),
  brand: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Brand is required",
    "string.min": "Brand must be at least 2 characters",
    "string.max": "Brand must not exceed 50 characters",
    "any.required": "Brand is required",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),
  image: Joi.object({
    url: Joi.string().uri().required(),
    public_id: Joi.string().trim().allow("").required(),
  }).messages({
    "object.base":"Image is required",
    "any.required":"Image is required"
  }),

});

module.exports = { createProductSchema };
