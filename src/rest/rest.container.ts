import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { ConfigSchema } from '../shared/libs/config/config.schema';
import { Config } from '../shared/libs/config/config.js';
import { LoggerInterface } from '../shared/libs/logger/logger.interface';
import { ConfigInterface } from '../shared/libs/config/config.interface';
import { DBClientInterface } from '../shared/libs/db-client/db-client.interface';
import { RestComponent } from './rest.component';
import { PinoLogger } from '../shared/libs/logger/pino.logger';
import { DBClient } from '../shared/libs/db-client/db-client.js';

export function createRestApplicationContainer() {
  const container = new Container();
  container.bind<RestApplication>(RestComponent.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(RestComponent.Logger).to(PinoLogger).inSingletonScope();
  container.bind<ConfigInterface<ConfigSchema>>(RestComponent.Config).to(Config).inSingletonScope();
  container.bind<DBClientInterface>(RestComponent.DBClient).to(DBClient).inSingletonScope();

  return container;
}
