import { ValidationError } from 'joi';
import HttpStatus from '@common/enums/httpStatus';
import AppError from './appError';

export default class RequestValidatorError extends AppError {
  statusCode = HttpStatus.BAD_REQUEST;

  constructor(private error: ValidationError) {
    super('Invalid Request Parameters');
    Object.setPrototypeOf(this, RequestValidatorError.prototype);
  }

  serializeErrors() {
    return this.error.details.map((err) => {
      return {
        message: err.message,
        path: err.path.join('.'),
        type: err.type,
      };
    });
  }
}
