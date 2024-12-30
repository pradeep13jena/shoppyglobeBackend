import { loginUser, registerUser } from "../Controller/auth.controller.js";

// Define authentication-related routes
export function authRoutes(app) {
  // Route for user registration
  app.post("/register", registerUser);
  // Route for user login
  app.post("/login", loginUser);
}
