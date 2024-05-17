import { Container } from 'inversify';

import { AuthExceptionFilter } from './auth.exception-filter.js';
import { AuthServiceInterface } from './auth.service.interface.js';
import { AuthComponent } from './auth.component.js';
import { AuthService } from './auth.service.js';
import { ExceptionFilterInterface } from '../../../rest/errors/exception-filter/exception-filter.interface.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthServiceInterface>(AuthComponent.AuthService).to(AuthService).inSingletonScope();
  authContainer.bind<ExceptionFilterInterface>(AuthComponent.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
