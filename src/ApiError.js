export default class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = message;
  }
}

export async function apiErrorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    ctx.status = error.statusCode;
    ctx.body = error;
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
