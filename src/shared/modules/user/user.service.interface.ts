import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
}
