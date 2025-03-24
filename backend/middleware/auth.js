import jsonwebtoken from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticatedError.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const { userId } = payload;
    req.user = { userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
