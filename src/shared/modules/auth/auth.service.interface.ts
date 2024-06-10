import { UserEntity } from '../user/user.entity.js';
import { LoginUserDTO } from '../user/dto/login-user.dto.js';

export interface AuthServiceInterface {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDTO): Promise<UserEntity>;
}
