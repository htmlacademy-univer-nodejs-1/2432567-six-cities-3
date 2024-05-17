import type { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { LoggerInterface } from '../../../shared/libs/logger/logger.interface.js';
import { RestComponent } from '../../rest.component.js';
import { HttpError } from '../http-error.js';
import { createErrorObject } from '../../../shared/utils/create-error-object.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class AppExceptionFilter implements ExceptionFilterInterface {

  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface,
  ) {
    this.pinoLogger.info('Register DefaultExceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.pinoLogger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.pinoLogger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
