import { config } from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';
import { RestComponent } from '../../../rest/rest.component.js';
import { inject, injectable } from 'inversify';

@injectable()
export class Config implements ConfigInterface<ConfigSchema> {
  private readonly config: ConfigSchema;

  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.pinoLogger.info});

    this.config = configSchema.getProperties();
    this.pinoLogger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
