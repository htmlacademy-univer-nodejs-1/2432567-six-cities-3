import { ValidationErrorField } from '../../rest/types/validation-error-field.type.js';
import { ApplicationError } from '../../rest/types/application-errors.enum.js';

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}
