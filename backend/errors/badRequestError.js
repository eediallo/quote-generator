import { CustomAPIError } from "./customApiError.js";

export class BadRequestError extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
  }
}
