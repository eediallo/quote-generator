import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/customApiError.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    msg: "Something went wrong, please try again later",
  });
};
