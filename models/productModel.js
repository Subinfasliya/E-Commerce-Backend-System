const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxLength: [120, "Product name cannot exceed 120 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be a negative value"],
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function (value) {
        return value < this.price;
      },
      message: "Discount price ({VALUE}) must be lower than the original price",
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product category is required"],
  },
  brand: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    public_id: { type: String },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
