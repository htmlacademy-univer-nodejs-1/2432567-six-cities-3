import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  // SALT: string;
  DB_HOST: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections', // комментарий
    format: 'port', // проверка по формату
    env: 'PORT', // значение из .env
    default: 4000 // значение, если в .env не будет найден переменная
  },
  // SALT: {
  //   doc: 'Salt for password hash',
  //   format: String,
  //   env: 'SALT',
  //   default: null
  // },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
});
