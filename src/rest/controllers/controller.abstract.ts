import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import { RouteInterface } from '../types/route.interface.js';
import { ControllerInterface } from './controller.interface.js';
import { PinoLogger } from '../../shared/libs/logger/pino.logger.js';
import expressAsyncHandler from 'express-async-handler';
import { PathTransformer } from '../transform/path-transformer.js';
import { RestComponent } from '../rest.component.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements ControllerInterface {
  private readonly _router: Router;

  @inject(RestComponent.PathTransformer) private pathTranformer: PathTransformer;

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
    const middlewareHandlers = route.middlewares?.map(
      (item) => expressAsyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.pinoLogger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTranformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public notFound(res: Response): void {
    this.send(res, StatusCodes.NOT_FOUND, null);
  }

  public badRequest(res: Response): void {
    this.send(res, StatusCodes.BAD_REQUEST, null);
  }
}
