import { CustomAPIError } from "./customApiError.js";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.success = false;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
