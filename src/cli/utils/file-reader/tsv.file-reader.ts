import EventEmitter from 'node:stream';
import { Offer } from '../../../shared/types.js';
import { createOffer } from '../create-offer/create-offer.js';
import { FileReader } from './file-reader.interface.js';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 16384; // 16KB

export class TsvFileReader extends EventEmitter implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => createOffer(line));
  }
}
