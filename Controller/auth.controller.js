import mongoose from "mongoose";
import userModel from "../Model/auth.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate that username and password are provided
  if (!username || password == undefined) {
    return res.status(404).json({ error: "username & password is required" });
  }

  // Validate that username and password are strings
  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(404)
      .json({ error: "username & password must be string" });
  }

  // Ensure username and password are not empty or whitespace
  if (username.trim() === "" || password.trim() === "") {
    return res
      .status(404)
      .json({
        message:
          "username or password cannot be empty or contains only whitespace",
      });
  }

  // Check if the username already exists in the database
  const checkUsername = await userModel.findOne({ username: username });
  if (checkUsername) {
    return res.status(403).json({ message: "Username already exists" });
  }

  try {
    // Create a new user with hashed password and save it to the database
    const newUser = new userModel({
      username,
      password: bcryptjs.hashSync(password, 10), // Hashing the password
    });
    await newUser.save(); // Save the new user to the database
    res.status(201).json({ message: "User registered successfully" }); // Success response
  } catch (error) {
    // Handle errors during user registration
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate that username and password are provided
  if (!username || password == undefined) {
    return res.status(404).json({ error: "username & password is required" });
  }

  // Validate that username and password are strings
  if (typeof username !== "string" || typeof password !== "string") {
    return res
      .status(404)
      .json({ error: "username & password must be string" });
  }

  // Ensure username and password are not empty or whitespace
  if (username.trim() === "" || password.trim() === "") {
    return res
      .status(404)
      .json({
        message:
          "username or password cannot be empty or contains only whitespace",
      });
  }

  try {
    // Check if the username exists in the database
    const checkUsername = await userModel.findOne({ username: username });
    if (!checkUsername) {
      return res.status(403).json({ message: "User is not registered" });
    }

    // Verify the provided password with the hashed password in the database
    const validUser = bcryptjs.compareSync(password, checkUsername.password);

    if (!validUser) {
      // If password is incorrect
      return res.status(403).json({ message: "Password is incorrect" });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    let token = jwt.sign({ _id: checkUsername._id }, "E<x?XbO8dKI{p;9", {
      expiresIn: "10m",
    });

    // Respond with the username and access token
    res.status(200).json({
      "User Name": username,
      "Access token": token,
    });
  } catch (error) {
    // Handle errors during login
    res.json({ error: error.message });
  }
};
