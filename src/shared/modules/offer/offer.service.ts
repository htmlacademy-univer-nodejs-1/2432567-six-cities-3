import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import type { DocumentType } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer.service.interface';
import { OfferComponent } from './offer.component.js';
import { RestComponent } from '../../../rest/rest.component';
import { CreateOfferDto } from './dto/create-offer.dto';
import { LoggerInterface } from '../../libs/logger/logger.interface';
import { UpdateOfferDTO } from './dto/update-offer.dto';
import { types } from '@typegoose/typegoose';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT } from '../../const.js';


@injectable()
export class OfferService implements OfferServiceInterface {

  constructor(
    @inject(RestComponent.Logger) private readonly pinoLogger: LoggerInterface,
    @inject(OfferComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(createOfferDTO: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(createOfferDTO);
    this.pinoLogger.info(`New offer created: ${createOfferDTO.title} (${result._id})`);

    return result;
  }

  public async updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, updateOfferDTO, { new: true })
      .populate('authorId')
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['authorId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public addToFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: true}, {new: true})
      .exec();
  }

  public removeFromFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: false}, {new: true})
      .exec();
  }

  public findAll(count?: number, offset?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const skip = offset ?? 0;
    return this.offerModel.find({limit, skip});
  }

  public findByCityAndPremium(city: string, count?: number, offset?: number): Promise<DocumentType<OfferEntity>[] | null> {
    const limit = count ?? PREMIUM_OFFER_COUNT;
    const skip = offset ?? 0;
    return this.offerModel
      .find({city: city, isPremium: true}, {}, {limit, skip})
      .populate('authorId')
      .exec();
  }

  public findFavorite(count?: number, offset?: number): Promise<DocumentType<OfferEntity>[] | null> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const skip = offset ?? 0;
    return this.offerModel
      .find({isFavorite: true}, {}, {limit, skip})
      .populate('authorId')
      .exec();
  }

  public incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': { commentsCount: 1 }}, { new: true });
  }

  public async updateOfferRating(id: string): Promise<DocumentType<OfferEntity> | null> {
    const rating = await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              {$match: {offerId: id}}, {$project: {rating: 1}},
              {$group: {_id: null, avg: {'$avg': '$rating'}}}
            ], as: 'avg'
          },
        },
      ]).exec();

    return this.offerModel
      .findByIdAndUpdate(id, {rating: rating[0]}, {new: true})
      .populate('authorId')
      .exec();
  }
}
