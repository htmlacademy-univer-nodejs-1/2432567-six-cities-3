import { Command } from './command.interface';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    ${chalk.blue('Программа для подготовки данных для REST API сервера.')}
    Пример:
        cli.js --<command>-- [--argument]
      Команды:
        ${chalk.green('--version')}                        # Номер версии
        ${chalk.green('--help')}                           # Печатает данный текст
        ${chalk.green('--import <path>')}                  # Импортирует данные
        ${chalk.green('--generate <n> <path> <url>')}      # Генерирует данные
    `);
  }
}
