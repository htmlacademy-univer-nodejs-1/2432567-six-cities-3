import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import { RouteInterface } from '../types/route.interface.js';
import { ControllerInterface } from './controller.interface.js';
import { PinoLogger } from '../../shared/libs/logger/pino.logger.js';
import expressAsyncHandler from 'express-async-handler';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements ControllerInterface {
  private readonly _router: Router;

  constructor(
    protected readonly pinoLogger: PinoLogger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface): void {
    const wrapperAsyncHandler = expressAsyncHandler(route.handler.bind(this));
    this._router[route.method](route.path, wrapperAsyncHandler);
    this.pinoLogger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT, null);
  }

  public notFound(res: Response): void {
    this.send(res, StatusCodes.NOT_FOUND, null);
  }

  public badRequest(res: Response): void {
    this.send(res, StatusCodes.BAD_REQUEST, null);
  }
}
