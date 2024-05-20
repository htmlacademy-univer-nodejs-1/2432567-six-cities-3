import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { RestComponent } from '../../rest.component.js';
import { PinoLogger } from '../../../shared/libs/logger/pino.logger.js';
import { HttpError } from '../http-error.js';
import { createErrorObject } from '../../../shared/utils/create-error-object.js';
import { ApplicationError } from '../../types/application-errors.enum.js';


@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: PinoLogger
  ) {
    this.pinoLogger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.pinoLogger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
