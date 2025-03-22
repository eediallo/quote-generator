import { CustomAPIError } from "./customApiError.js";
import { StatusCodes } from "http-status-codes";

export class notFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
