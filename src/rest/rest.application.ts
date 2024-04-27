import { LoggerInterface } from '../shared/libs/logger/logger.interface.js';
import {ConfigInterface} from '../shared/libs/config/config.interface.js';
import { ConfigSchema } from '../shared/libs/config/config.schema';
import { inject, injectable } from 'inversify';
import { RestComponent } from './rest.component';
import { DBClient } from '../shared/libs/db-client/db-client.js';
import { getMongoURI } from '../shared/utils/get-url.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface,
    @inject(RestComponent.Config) private readonly config: ConfigInterface<ConfigSchema>,
    @inject(RestComponent.DBClient) private readonly dbClient: DBClient
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
    this.pinoLogger.info('Application initialization');
    this.pinoLogger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.pinoLogger.info('Init database…');
    await this._initDb();
    this.pinoLogger.info('Init database completed');
  }
}
