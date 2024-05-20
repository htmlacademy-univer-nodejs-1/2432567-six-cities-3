import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { ConfigSchema } from '../shared/libs/config/config.schema';
import { Config } from '../shared/libs/config/config.js';
import { LoggerInterface } from '../shared/libs/logger/logger.interface.js';
import { ConfigInterface } from '../shared/libs/config/config.interface.js';
import { DBClientInterface } from '../shared/libs/db-client/db-client.interface.js';
import { RestComponent } from './rest.component.js';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { DBClient } from '../shared/libs/db-client/db-client.js';
import { ExceptionFilterInterface } from './errors/exception-filter/exception-filter.interface.js';
import { AppExceptionFilter } from './errors/exception-filter/app.exception-filter.js';
import { ValidationExceptionFilter } from './errors/exception-filter/validation.exception-filter.js';
import { HttpErrorExceptionFilter } from './errors/exception-filter/http-error.exception-filter.js';
import { PathTransformer } from './transform/path-transformer.js';

export function createRestApplicationContainer() {
  const container = new Container();
  container.bind<RestApplication>(RestComponent.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(RestComponent.Logger).to(PinoLogger).inSingletonScope();
  container.bind<ConfigInterface<ConfigSchema>>(RestComponent.Config).to(Config).inSingletonScope();
  container.bind<DBClientInterface>(RestComponent.DBClient).to(DBClient).inSingletonScope();
  container.bind<ExceptionFilterInterface>(RestComponent.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilterInterface>(RestComponent.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilterInterface>(RestComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<PathTransformer>(RestComponent.PathTransformer).to(PathTransformer).inSingletonScope();

  return container;
}
