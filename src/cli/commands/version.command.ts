import { resolve } from 'node:path';
import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';


type TPackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is TPackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {

  constructor(
    private readonly filePath: string = './package.json',
    private logger: ConsoleLogger = new ConsoleLogger()
  ) { }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content/');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      this.logger.info(version);
    } catch (error: unknown) {
      this.logger.error(`Failed ti read version from ${this.filePath}`, error as Error);
      if (error instanceof Error) {
        this.logger.error(error.message, error);
      }
    }
  }
}
