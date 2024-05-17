import { inject, injectable } from 'inversify';
import { AuthServiceInterface } from './auth.service.interface.js';
import { PinoLogger } from '../../libs/logger/pino.logger.js';
import { RestComponent } from '../../../rest/rest.component.js';
import { UserComponent } from '../user/user.component.js';
import { UserService } from '../user/user.service.js';
import { ConfigSchema } from '../../libs/config/config.schema.js';
import { UserEntity } from '../user/user.entity.js';
import * as crypto from 'node:crypto';
import { ConfigInterface } from '../../libs/config/config.interface.js';
import { TokenPayload } from './types/token-payload.js';
import { SignJWT } from 'jose';
import { JWT_ALGORITHM, JWT_EXPIRED } from '../../const.js';
import { LoginUserDTO } from '../user/dto/login-user.dto.js';
import { UserNotFoundException } from '../errors/user-not-found.exception.js';
import { UserPasswordIncorrectException } from '../errors/user-password-incorrect.exception.js';

@injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: PinoLogger,
    @inject(RestComponent.Config) private readonly config: ConfigInterface<ConfigSchema>,
    @inject(UserComponent.UserService) private readonly userService: UserService,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };

    this.pinoLogger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (! user) {
      this.pinoLogger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.pinoLogger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
