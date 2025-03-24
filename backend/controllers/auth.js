import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({ name, email, password: passwordHash });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("Login");
};

export { register, login };
