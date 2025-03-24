import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("Login");
};

export { register, login };
