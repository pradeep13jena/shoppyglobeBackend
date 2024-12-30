import mongoose from "mongoose";
import express from "express";
import { routes } from "./Routes/product.routes.js";
import { Cartroutes } from "./Routes/cart.routes.js";
import { authRoutes } from "./Routes/auth.routes.js";

const port = 5000; // Define the port number for the server
const app = express(); // Initialize an Express application

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to log HTTP request details
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log({
      Method: req.method, // Log the HTTP method
      URL: req.originalUrl, // Log the requested URL
      Status: res.statusCode, // Log the response status code
    });
  });
  next(); // Pass control to the next middleware or route handler
});

// Connect to the MongoDB database
mongoose.connect(
  "mongodb+srv://goldrushatjenas:CWWpxzrkNnRffbyH@cluster0.iglry.mongodb.net/shoppyglobebackend"
);
const db = mongoose.connection;

// Event listener for successful database connection
db.on("open", () => {
  console.log("db is connected");
});

// Event listener for database connection errors
db.on("error", () => {
  console.log("Db error");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Register routes for product, cart, and authentication functionality
routes(app); // Routes for product-related operations
Cartroutes(app); // Routes for cart-related operations
authRoutes(app); // Routes for authentication
