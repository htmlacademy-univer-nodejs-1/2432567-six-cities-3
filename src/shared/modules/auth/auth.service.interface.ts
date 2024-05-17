import { UserEntity } from '../user/user.entity';
import { LoginUserDTO } from '../user/dto/login-user.dto';

export interface AuthServiceInterface {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDTO): Promise<UserEntity>;
}
