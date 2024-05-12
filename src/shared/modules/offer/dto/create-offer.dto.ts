import { City, Facilities, HouseType } from '../../../const.js';
import { Coordinates } from '../../../types.js';
import { UserEntity } from '../../user/user.entity.js';
import { Ref } from '@typegoose/typegoose';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId, IsNumber, IsObject,
  IsString,
  Max,
  MaxLength, Min,
  MinLength
} from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {

  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  public photos: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  public rating: number;

  @IsEnum(HouseType, {message: CreateOfferValidationMessage.houseType.invalidFormat})
  public houseType: HouseType;

  @IsNumber({}, { message: CreateOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countRooms.min })
  @Max(8, { message: CreateOfferValidationMessage.countRooms.max })
  public countRooms: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countGuests.min })
  @Max(10, { message: CreateOfferValidationMessage.countGuests.max })
  public countGuests: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.min })
  @Max(100000, { message: CreateOfferValidationMessage.price.max })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(Facilities, {message: CreateOfferValidationMessage.facilities.invalidElementFormat})
  public facilities: Facilities[];

  @IsMongoId({ message: CreateOfferValidationMessage.authorId.invalidId })
  public authorId: Ref<UserEntity>;

  @IsObject({ message: CreateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates: Coordinates;
}
