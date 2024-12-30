import mongoose from "mongoose";
import productModel from "../model/product.model.js";
import CartModel from "../Model/cart.model.js";

export const fetchItemAggr = async () => {
  try {
    // Query the MongoDB 'carts' collection and perform an aggregation to join with the 'products' collection
    const cartItems = await mongoose.connection.db
      .collection("carts")
      .aggregate([
        // Lookup to join the 'products' collection with the 'carts' collection
        {
          $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "id",
            as: "productDetails",
          },
        },

        // This is necessary because $lookup returns an array of matched documents, and we need to flatten them.
        {
          $unwind: "$productDetails", // Flatten the 'productDetails' array into individual documents
        },
        // We are including 'productID', 'productDetails', and 'quantity' while excluding the '_id' field in the actual datalist
        {
          $project: {
            productID: 1,
            productDetails: 1,
            quantity: 1,
            _id: 0,
          },
        },
      ])
      .toArray();

    return cartItems;
  } catch {
    // If any error occurs during the aggregation, throw an error with a relevant message
    throw new Error("Failed to fetch cart items.");
  }
};

export const fetchCartWithDetails = async (req, res) => {
  try {
    // Fetch cart items using fetchItemAggr which is a function which
    // join two dfferent collection in mongoDB
    const cartItems = await fetchItemAggr();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addProductTocart = async (req, res) => {
  const { id } = req.body;

  // To check if id is defined?
  // If not, Display error,
  // If yes, move ahead
  if (id === undefined) {
    return res.status(400).json({ error: "id is required" });
  }

  // To check if the defined id is a number or not?
  // If it is not a number, then return error text, "id should be a number"
  // If it is a number, then move ahead
  if (typeof id !== "number") {
    return res.status(400).json({ error: "id should be a number" });
  }

  // To check if the given id is greater than 0?
  // If it is less than 0, return error text, "id must be a non-negative number"
  // If it is more than 0, move ahead
  if (id < 0) {
    return res.status(400).json({ error: "id must be a non-negative number" });
  }

  try {
    // To check if there is any product with the given id?
    const productAvail = await productModel.findOne({ id });
    if (!productAvail) {
      // If there is no product with the given id,
      // then return message text, "No such product"
      return res.status(404).json({ message: "No such product" });
    }

    // If there is a product with the given id, then check if it is already present in the cart?
    const cartItemAvail = await CartModel.findOne({ productID: id });

    if (!cartItemAvail) {
      // If there is no such item in the cart,
      // Then add the product to the cart.
      // Create a new item using the cart model.
      const newItem = new CartModel({
        productID: id,
        quantity: 1,
      });

      // Then save it
      await newItem.save();

      // Fetch the new cart list with the added item.
      const cartItems = await fetchItemAggr();
      return res.status(201).json({
        message: `Product ${id} saved to the cart.`,
        data: cartItems,
      });
    } else {
      // If there is an item in the cart with such id,
      // Increase the quantity of the item in the cart.
      await CartModel.updateOne({ productID: id }, { $inc: { quantity: 1 } });

      // Fetch the updated cart list.
      const cartItems = await fetchItemAggr();
      return res.status(200).json({
        message: `Quantity of the product ${id} increased by 1.`,
        data: cartItems,
      });
    }
  } catch (error) {
    // Catch any errors that occur during the operation
    return res.status(500).json({ error: error.message });
  }
};

export const updateTheCart = async (req, res) => {
  const { id, quantity } = req.body;

  // To check if id is defined?
  // If not, Display error,
  // If yes, move ahead
  if (!id || quantity === undefined) {
    return res.status(404).json({ error: "ID, and quantity are required" });
  }

  // To check if the defined id, quantity is a number or not?
  // If it is not a number, then return error text, "id & quantity should be a number"
  // If it is a number, then move ahead
  if (typeof quantity !== "number" || typeof id !== "number") {
    return res.status(404).json({ error: "quantity & id should be a number" });
  }

  // To check if the given id, quantity is greater than 0?
  // If it is less than 0, return error text, "id must be a non-negative number"
  // If it is more than 0, move ahead
  if (quantity < 0 || id < 0) {
    return res
      .status(404)
      .json({ error: "Quantity & id must be a non-negative number" });
  }

  try {
    // To check if the item with the id is present in the cart or not.
    const cartItemAvail = await CartModel.findOne({ productID: id });

    // If items is not present in the cart
    // then return "No such product in the cart"
    if (!cartItemAvail) {
      return res.status(404).json({ message: "No such product in the cart" });
    } else {
      // If item is present,
      // then update the quantity.
      const cartItemUpdate = await mongoose.connection.db
        .collection("carts")
        .updateOne({ productID: id }, { $set: { quantity: quantity } });

      if (quantity === 0) {
        await mongoose.connection.db
          .collection("carts")
          .deleteOne({ productID: id });
        const cartItems = await fetchItemAggr();
        return res
          .status(200)
          .json({
            message: `Product number ${id} deleted from the cart as the quantity was set to 0`,
            data: cartItems,
          });
      }

      const cartItems = await fetchItemAggr();
      res
        .status(200)
        .json({
          message: `Product number ${id}'s quantity set to ${quantity}`,
          data: cartItems,
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTheCart = async (req, res) => {
  const { id } = req.body;

  // To check if id is defined?
  // If not, Display error,
  // If yes, move ahead
  if (id === undefined) {
    return res.status(400).json({ error: "id is required" });
  }

  // To check if the defined id is a number or not?
  // If it is not a number, then return error text, "id should be a number"
  // If it is a number, then move ahead
  if (typeof id !== "number") {
    return res.status(400).json({ error: "id should be a number" });
  }

  // To check if the given id is greater than 0?
  // If it is less than 0, return error text, "id must be a non-negative number"
  // If it is more than 0, move ahead
  if (id < 0) {
    return res.status(400).json({ error: "id must be a non-negative number" });
  }

  try {
    // then search for the product want to delete
    const cartItemAvail = await CartModel.findOne({ productID: id });

    // If the item is not present then return message, "No such product in the cart"
    if (!cartItemAvail) {
      res.status(404).json({ message: "No such product in the cart" });
    } else {
      // If the item is present then delte it.
      await mongoose.connection.db
        .collection("carts")
        .deleteOne({ productID: id });
      const cartItems = await fetchItemAggr();
      res
        .status(200)
        .json({
          message: `Product number ${id} deleted`,
          "Cart Items": cartItems,
        });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
