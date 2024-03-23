import { config } from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../component.js';
import { inject, injectable } from 'inversify';

@injectable()
export class RestConfig implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger)
    private readonly logger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
