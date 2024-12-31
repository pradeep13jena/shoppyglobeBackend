import {
  fetchCartWithDetails,
  addProductTocart,
  deleteTheCart,
  updateTheCart,
} from "../Controller/cart.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

// Define routes for cart-related operations
export function Cartroutes(app) {
  // Route to fetch cart details (protected route requiring token verification)
  app.get("/carts", verifyToken, fetchCartWithDetails);

  // Route to add a product to the cart
  app.post("/carts", verifyToken, addProductTocart);

  // Route to update the cart
  app.put("/carts", verifyToken, updateTheCart);

  // Route to delete the cart
  app.delete("/carts", verifyToken, deleteTheCart);
}
