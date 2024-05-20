import { LoggerInterface } from '../shared/libs/logger/logger.interface.js';
import {ConfigInterface} from '../shared/libs/config/config.interface.js';
import { ConfigSchema } from '../shared/libs/config/config.schema.js';
import { inject, injectable } from 'inversify';
import cors from 'cors';
import { RestComponent } from './rest.component.js';
import { getMongoURI } from '../shared/utils/get-url.js';
import express, { Express } from 'express';
import { OfferComponent } from '../shared/modules/offer/offer.component.js';
import { ControllerInterface } from './controllers/controller.interface.js';
import { UserComponent } from '../shared/modules/user/user.component.js';
import { ExceptionFilterInterface } from './errors/exception-filter/exception-filter.interface.js';
import { DBClientInterface } from '../shared/libs/db-client/db-client.interface.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import { CommentComponent } from '../shared/modules/comment/comment.component.js';
import { AuthComponent } from '../shared/modules/auth/auth.component.js';
import { ParseTokenMiddleware } from './middleware/parse-token.middleware.js';
import { getFullServerPath } from '../shared/utils/full-server-path.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from '../shared/const.js';


@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface,
    @inject(RestComponent.Config) private readonly config: ConfigInterface<ConfigSchema>,
    @inject(RestComponent.DBClient) private readonly dbClient: DBClientInterface,
    @inject(RestComponent.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilterInterface,
    @inject(RestComponent.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilterInterface,
    @inject(RestComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilterInterface,
    @inject(OfferComponent.OfferController) private readonly offerController: ControllerInterface,
    @inject(UserComponent.UserController) private readonly userController: ControllerInterface,
    @inject(CommentComponent.CommentController) private readonly commentController: ControllerInterface,
    @inject(AuthComponent.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilterInterface,
  ) {
    this.server = express();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.dbClient.connect(mongoUri);
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comment', this.commentController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async _initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter)); // last
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
    this.server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  public async init() {
    this.pinoLogger.info('Application initialization');

    this.pinoLogger.info('Init database…');
    await this._initDb();
    this.pinoLogger.info('Init database completed');

    this.pinoLogger.info('Init app-level middleware');
    await this._initMiddleware();
    this.pinoLogger.info('App-level middleware initialization completed');

    this.pinoLogger.info('Init controllers');
    await this._initControllers();
    this.pinoLogger.info('Controller initialization completed');

    this.pinoLogger.info('Init exception filters');
    await this._initExceptionFilters();
    this.pinoLogger.info('Exception filters initialization completed');

    this.pinoLogger.info('Try to init server…');
    await this._initServer();
    this.pinoLogger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
