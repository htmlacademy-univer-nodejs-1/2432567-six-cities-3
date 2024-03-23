import { TSVOfferGenerator } from '../utils/file-generator/tsv-offer-generator.js';
import { MockServerData } from '../utils/file-generator/types.js';
import { Command } from './command.interface.js';
import got from 'got';
import {TSVFileWriter} from '../utils/file-writer/tsc-file-writer.js';
import {getErrorMessage} from '../utils/error-message/error-message.js';


export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      if (error instanceof Error) {
        console.error(error.message);
        console.error(getErrorMessage(error));
      }
    }
  }
}
