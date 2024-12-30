import mongoose, { Schema } from "mongoose";

// Define the User schema for User collection
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Define the model for user
const userModel = mongoose.model("User", userSchema);
export default userModel;
