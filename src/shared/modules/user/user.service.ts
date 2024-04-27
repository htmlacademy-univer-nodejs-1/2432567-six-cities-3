import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { inject, injectable } from 'inversify';
import { RestComponent } from '../../../rest/rest.component';
import { UserServiceInterface } from './user.service.interface';
import { UserComponent } from './user.component';
import { LoggerInterface } from '../../libs/logger/logger.interface';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly logger: LoggerInterface,
    @inject(UserComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const userEntity = new UserEntity(dto);
    userEntity.setPassword(dto.password, salt);

    const savedUserEntity = await this.userModel.create(userEntity);
    this.logger.info(`New user created: ${savedUserEntity.email}`);

    return savedUserEntity;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }
}
