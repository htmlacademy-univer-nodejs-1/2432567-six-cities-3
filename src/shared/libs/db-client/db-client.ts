import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DBClientInterface } from './db-client.interface.js';
import { RestComponent } from '../../../rest/rest.component';
import { setTimeout } from 'node:timers/promises';
import { LoggerInterface } from '../logger/logger.interface';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class DBClient implements DBClientInterface {
  private mongoose: typeof Mongoose;

  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface,
  private isConnected: boolean = false
  ) { }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.pinoLogger.info('Trying to connect to MongoDB…');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.pinoLogger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.pinoLogger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.pinoLogger.info('Database connection closed.');
  }
}
