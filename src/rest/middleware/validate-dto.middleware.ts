import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { MiddlewareInterface } from './middleware.interface.js';
import { ValidationError } from '../errors/exceptions/validation.error.js';
import { reduceValidationErrors } from '../../shared/utils/reduce-validation-errors.js';

export class ValidateDTOMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({ body, path }: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: ${path}`, reduceValidationErrors(errors));
    }

    next();
  }
}
