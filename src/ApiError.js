export default class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = message;
  }
}

export class BadRequest extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

export class InvalidBooleanQuery extends BadRequest {
  constructor(parameter) {
    super('Invalid value provided to boolean query parameter.');
    this.parameter = parameter;
  }
}
