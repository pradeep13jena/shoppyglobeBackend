import productModel from "../model/product.model.js";

// Fetch information for all products
export async function fetchProductInfo(req, res) {
  try {
    // Retrieve all products from the database
    const products = await productModel.find();
    // Respond with the product list and a success status
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and respond with an appropriate error message
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
}

// Fetch information for a single product based on its ID
export async function fetchSingleProductInfo(req, res) {
  const { id } = req.params; // Extract product ID from request parameters

  try {
    // Search the database for a product with the specified ID
    const user = await productModel.find({ id: id });
    // If the product exists, return it; otherwise, send a "not found" response
    user.length !== 0
      ? res.status(200).send(user)
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    // Handle errors and respond with an appropriate error message
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
}
