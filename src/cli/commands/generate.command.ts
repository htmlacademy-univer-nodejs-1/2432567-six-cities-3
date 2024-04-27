import { TsvOfferGenerator } from '../utils/generator/tsv.offer-generator';
import { MockServerData } from '../types.js';
import { Command } from './command.interface.js';
import got from 'got';
import {TSVFileWriter} from '../utils/file-writer/tsv.file-writer';
import {getErrorMessage} from '../utils/error-message/error-message.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger';


export class GenerateCommand implements Command {
  private initialData: MockServerData;
  constructor(
    private logger: ConsoleLogger = new ConsoleLogger()
  ) { }

  public getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      this.logger.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      this.logger.error('Can\'t generate data', error as Error);
      if (error instanceof Error) {
        this.logger.error(error.message, error);
        this.logger.error(getErrorMessage(error), error);
      }
    }
  }
}
