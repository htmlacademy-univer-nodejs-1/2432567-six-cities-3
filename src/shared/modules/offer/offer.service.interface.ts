import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity';
import { UpdateOfferDTO } from './dto/update-offer.dto';

export interface OfferServiceInterface {
  create(createOfferDTO: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(count?: number, offset?: number): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByCityAndPremium(city: string, count?: number, offset?: number): Promise<DocumentType<OfferEntity>[] | null>;
  findFavorite(count?: number, offset?: number): Promise<DocumentType<OfferEntity>[] | null>;
  addToFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateOfferRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
