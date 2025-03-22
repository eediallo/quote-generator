import { CustomAPIError } from "../errors/customApiError.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  return res.status(500).send("Something went wrong try again later");
};
