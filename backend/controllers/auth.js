import { User } from "../models/user.js";

const register = async (req, res) => {
  res.send("Register");
};

const login = async (req, res) => {
  res.send("Login");
};

export { register, login };
