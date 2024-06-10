import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error.js';
import { ValidationErrorField } from '../../types/validation-error-field.type';

export class ValidationError extends HttpError {
  public details: ValidationErrorField[] = [];

  constructor(message: string, details: ValidationErrorField[]) {
    super(StatusCodes.UNAUTHORIZED, message);
    this.details = details;
  }
}
