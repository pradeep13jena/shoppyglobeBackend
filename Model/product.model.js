import mongoose, { Schema } from "mongoose";

// Define the Cart schema for cart collection
const Product = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
});

// Define the model for cart
const productModel = mongoose.model("products", Product);

export default productModel;
