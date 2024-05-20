import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { RestComponent } from '../../rest.component.js';
import { PinoLogger } from '../../../shared/libs/logger/pino.logger.js';
import { createErrorObject } from '../../../shared/utils/create-error-object.js';
import { ApplicationError } from '../../types/application-errors.enum.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: PinoLogger
  ) {
    this.pinoLogger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.pinoLogger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
