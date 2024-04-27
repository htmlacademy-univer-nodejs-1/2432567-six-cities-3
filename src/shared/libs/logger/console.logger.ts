import { LoggerInterface } from './logger.interface.js';
import { getErrorMessage } from '../../../cli/utils/error-message/error-message.js';

export class ConsoleLogger implements LoggerInterface {
  public debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    console.error(message, ...args);
    console.error(`Error message: ${getErrorMessage(error)}`);
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }
}
