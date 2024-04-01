import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Logger } from './shared/libs/logger/logger.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';
import { ConfigInterface } from './shared/libs/config/config.interface.js';
import { Component } from './shared/component.js';
import { LoggerInterface } from './shared/libs/logger/logger.interface.js';
import { DBClientInterface } from './shared/libs/db-client/db-client.interface.js';
import { DBClient } from './shared/libs/db-client/db-client.js';


async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(Component.Logger).to(Logger).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DBClientInterface>(Component.DBClient).to(DBClient).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

await bootstrap();
