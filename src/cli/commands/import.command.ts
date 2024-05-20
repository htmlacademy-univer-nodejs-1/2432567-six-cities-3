import { TsvFileReader } from '../utils/file-reader/tsv.file-reader.js';
import { createOffer } from '../utils/create-offer/create-offer.js';
import { Command } from './command.interface.js';
import { UserService } from '../../shared/modules/user/user.service.js';
import { OfferService } from '../../shared/modules/offer/offer.service.js';
import { DBClient } from '../../shared/libs/db-client/db-client.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DBClientInterface } from '../../shared/libs/db-client/db-client.interface.js';
import { LoggerInterface } from '../../shared/libs/logger/logger.interface.js';
import { Offer } from '../../shared/types.js';
import { getMongoURI } from '../../shared/utils/get-url.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from '../../shared/const.js';
import chalk from 'chalk';


export class ImportCommand implements Command {
  private readonly logger: LoggerInterface;
  private userService: UserService;
  private offerService: OfferService;
  private DBClient: DBClientInterface;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.DBClient = new DBClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);
    await this.DBClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const userDTO = {
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    };

    let userEntity = await this.userService.findByEmail(userDTO.email);
    if (userEntity === null) {
      userEntity = await this.userService.create(userDTO, this.salt);
    }

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      houseType: offer.houseType,
      countRooms: offer.countRooms,
      countGuests: offer.countGuests,
      price: offer.price,
      facilities: [...offer.facilities],
      authorId: userEntity.id,
      coordinates: offer.coordinates
    });
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const mongoURI = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.logger.info(mongoURI);

    this.salt = salt;

    await this.DBClient.connect(mongoURI);

    const tsvFileReader = new TsvFileReader(filename.trim());

    tsvFileReader.on('line', this.onImportedLine);
    tsvFileReader.on('end', this.onCompleteImport);

    try {
      await tsvFileReader.read();
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      } else {
        this.logger.error(chalk.red(`Can't import data from file: ${filename}`), error);
        this.logger.error(chalk.red(`Details: ${error.message}`), error);
      }
    }
  }
}
