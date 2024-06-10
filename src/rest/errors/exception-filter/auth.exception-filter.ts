import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { RestComponent } from '../../rest.component.js';
import { PinoLogger } from '../../../shared/libs/logger/pino.logger.js';
import { BaseUserException } from '../exceptions/base-user.exception.js';
import { ExceptionFilterInterface } from './exception-filter.interface.js';


@injectable()
export class AuthExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: PinoLogger
  ) {
    this.pinoLogger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof BaseUserException)) {
      return next(error);
    }

    this.pinoLogger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
