import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer-dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  create(createOfferDTO: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
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
