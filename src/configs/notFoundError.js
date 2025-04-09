const AppError = require("./appError");

class NotFoundError extends AppError {
    constructor(message = "Not found", number) {
    super(`${message}`, 404);
  }
}

module.exports = NotFoundError;
