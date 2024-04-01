import { LoggerInterface } from '../shared/libs/logger/logger.interface.js';
import {ConfigInterface} from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/component.js';
import { DBClient } from '../shared/libs/db-client/db-client.js';
import { getMongoURI } from '../shared/utils/get-url/get-url.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: ConfigInterface<RestSchema>,
    @inject(Component.DBClient) private readonly dbClient: DBClient
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.dbClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');
  }
}
