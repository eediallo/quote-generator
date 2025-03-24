import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    minglength: [3, "Name must be at least 3 characters long"],
    maxlength: [30, "Name must be less than 30 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
      "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number",
    ],
  },
});



export const User = mongoose.model("User", userSchema);
