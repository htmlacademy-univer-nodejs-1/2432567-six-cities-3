import { LoggerInterface } from '../shared/libs/logger/logger.interface.js';
import {ConfigInterface} from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/component.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: ConfigInterface<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
