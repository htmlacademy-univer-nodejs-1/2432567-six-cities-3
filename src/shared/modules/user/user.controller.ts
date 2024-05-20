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
import { ValidateDTOMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';
import { UploadFileMiddleware } from '../../../rest/middleware/upload-file.middleware.js';
import { ValidateObjectIdMiddleware } from '../../../rest/middleware/validate-objectid.middleware.js';
import { AuthComponent } from '../auth/auth.component.js';
import { LoginRDO } from './rdo/login.rdo.js';
import { AuthService } from '../auth/auth.service.js';
import { UploadUserAvatarRDO } from './rdo/upload-user-avatar.rdo.js';
import { ParamUserId } from './types/param-userid.type.js';

export class UserController extends BaseController {

  constructor(
    @inject(RestComponent.Logger) protected readonly pinoLogger: PinoLogger,
    @inject(RestComponent.Config) private readonly config: Config,
    @inject(UserComponent.UserService) private readonly userService: UserService,
    @inject(AuthComponent.AuthService) private readonly authService: AuthService,
  ) {
    super(pinoLogger);
    this.pinoLogger.info('Register router for UserController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDTOMiddleware(CreateUserDTO)]
    });
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.getStatus });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDTOMiddleware(LoginUserDTO)]
    });
    this.addRoute({ path: '/logout', method: HttpMethod.Delete, handler: this.logout });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
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
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoginRDO, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async logout(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async uploadAvatar({ params, file }: Request<ParamUserId>, res: Response) {
    const { userId } = params;
    const uploadFile = { avatarPath: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    const responseData = fillDTO(UploadUserAvatarRDO, { filepath: uploadFile.avatarPath });
    this.created(res, responseData);
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const responseData = fillDTO(LoginRDO, foundedUser);
    this.ok(res, responseData);
  }
}
