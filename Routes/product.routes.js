import {
  fetchProductInfo,
  fetchSingleProductInfo,
} from "../Controller/products.controller.js";

// Define routes for product-related operations
export function routes(app) {
  // Route to fetch all products
  app.get("/products", fetchProductInfo);

  // Route to fetch a single product by ID
  app.get("/products/:id", fetchSingleProductInfo);
}
