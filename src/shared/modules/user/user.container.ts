import { Container } from 'inversify';
import { UserServiceInterface } from './user.service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import { types } from '@typegoose/typegoose';
import { UserService } from './user.service.js';
import { UserComponent } from './user.component.js';
import { UserController } from './user.controller.js';
import { ControllerInterface } from '../../../rest/controllers/controller.interface.js';


export function createUserContainer() { // todo: ? возможно ли такое создание контейнеров, то есть отдельный компонент
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(UserComponent.UserService).to(UserService).inSingletonScope();
  userContainer.bind<ControllerInterface>(UserComponent.UserController).to(UserController).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(UserComponent.UserModel).toConstantValue(UserModel); // работа напрямую с UserModel
  return userContainer;
}
