import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import type { DocumentType, types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer.service.interface';
import { OfferComponent } from './offer.component.js';
import { RestComponent } from '../../../rest/rest.component';
import { CreateOfferDto } from './dto/create-offer.dto';
import { LoggerInterface } from '../../libs/logger/logger.interface';


@injectable()
export class OfferService implements OfferServiceInterface {

  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface,
    @inject(OfferComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.pinoLogger.info(`New offer created: ${dto.title} (${result._id})`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['authorId'])
      .exec();
  }
}
