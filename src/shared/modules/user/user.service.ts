import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { RestComponent } from '../../../rest/rest.component.js';
import { UserServiceInterface } from './user.service.interface.js';
import { UserComponent } from './user.component.js';
import { LoggerInterface } from '../../libs/logger/logger.interface.js';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @inject(RestComponent.Logger) private readonly logger: LoggerInterface,
    @inject(UserComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const userEntity = new UserEntity(dto);
    userEntity.setPassword(dto.password, salt);

    const savedUserEntity = await this.userModel.create(userEntity);
    this.logger.info(`New user created: ${savedUserEntity.email}`);

    return savedUserEntity;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.userModel
      .exists({_id: documentId})) !== null;
  }
}
