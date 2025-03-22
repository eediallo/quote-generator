import { CustomAPIError } from "./customApiError.js";

export class notFoundError extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
