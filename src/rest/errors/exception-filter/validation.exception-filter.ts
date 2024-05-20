import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { PinoLogger } from '../../../shared/libs/logger/pino.logger.js';
import { RestComponent } from '../../rest.component.js';
import { ValidationError } from '../validation.error.js';
import { ApplicationError } from '../../types/application-errors.enum.js';
import { createErrorObject } from '../../../shared/utils/create-error-object.js';


@injectable()
export class ValidationExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: PinoLogger
  ) {
    this.pinoLogger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.pinoLogger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.pinoLogger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
