import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO } from './dto/create-offer-dto';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { DocumentExists } from '../../../rest/types/document-exists.interface.js';

export interface OfferServiceInterface extends DocumentExists {
  create(createOfferDTO: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(count?: number, offset?: number): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByCityAndPremium(city: string, count?: number, offset?: number): Promise<DocumentType<OfferEntity>[] | null>;
  findFavoriteOffers(count?: number, offset?: number): Promise<DocumentType<OfferEntity>[] | null>;
  addToFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateOfferRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
