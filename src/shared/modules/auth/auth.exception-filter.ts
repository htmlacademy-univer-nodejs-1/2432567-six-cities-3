import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { RestComponent } from '../../../rest/rest.component.js';
import { PinoLogger } from '../../libs/logger/pino.logger.js';
import { BaseUserException } from '../errors/base-user.exception.js';
import { ExceptionFilterInterface } from '../../../rest/errors/exception-filter/exception-filter.interface';


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
