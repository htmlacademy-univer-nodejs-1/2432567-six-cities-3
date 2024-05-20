export const RestComponent = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DBClient: Symbol.for('DBClient'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  PathTransformer: Symbol.for('PathTransformer'),
} as const;
