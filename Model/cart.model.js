import mongoose, { Schema } from "mongoose";

// Define the Cart schema for cart collection
const cartSchema = new Schema({
  productID: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Define the model for cart
const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
