import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("Login");
};

export { register, login };
