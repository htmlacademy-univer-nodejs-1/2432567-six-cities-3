import { BaseController } from '../../../rest/controllers/controller.abstract.js';
import { RestComponent } from '../../../rest/rest.component.js';
import { inject } from 'inversify';
import { UserComponent } from './user.component.js';
import { PinoLogger } from '../../libs/logger/pino.logger.js';
import { Config } from '../../libs/config/config.js';
import { UserService } from './user.service.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { Request, Response } from 'express';
import { RequestParams } from '../../../rest/types/request-params.type.js';
import { RequestBody } from '../../../rest/types/request-body.type.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { HttpError } from '../../../rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/fill-dto.js';
import { UserRDO } from './rdo/user.rdo.js';
import { LoginUserDTO } from './dto/login-user.dto.js';

export class UserController extends BaseController {

  constructor(
    @inject(RestComponent.Logger) protected readonly pinoLogger: PinoLogger,
    @inject(RestComponent.Config) private readonly config: Config,
    @inject(UserComponent.UserService) private readonly userService: UserService,
  ) {
    super(pinoLogger);
    this.pinoLogger.info('Register router for UserController');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.getStatus });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: '/logout', method: HttpMethod.Delete, handler: this.logout });
    this.addRoute({ path: '/:id/avatar', method: HttpMethod.Post, handler: this.uploadAvatar });
  }

  public async create(
    { body }: Request<RequestParams, RequestBody, CreateUserDTO>,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRDO, result));
  }

  public async getStatus(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async login(
    { body }: Request<RequestParams, RequestBody, LoginUserDTO>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async logout(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async uploadAvatar(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }
}
