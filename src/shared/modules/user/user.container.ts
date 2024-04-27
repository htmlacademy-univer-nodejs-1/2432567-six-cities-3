import { Container } from 'inversify';
import { UserServiceInterface } from './user.service.interface';
import { UserEntity, UserModel } from './user.entity';
import { types } from '@typegoose/typegoose';
import { UserService } from './user.service';
import { UserComponent } from './user.component';


export function createUserContainer() { // todo: ? возможно ли такое создание контейнеров, то есть отдельный компонент
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(UserComponent.UserService).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(UserComponent.UserModel).toConstantValue(UserModel); // работа напрямую с UserModel
  return userContainer;
}
