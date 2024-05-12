import { City, Facilities, HouseType } from '../../../const.js';
import { Coordinates } from '../../../types.js';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDTO {

  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalidFormat })
  public city?: City;

  @MaxLength(256, { message: UpdateOfferValidationMessage.preview.maxLength })
  public preview?: string;

  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  public pictures?: string[];

  @IsEnum(HouseType, {message: UpdateOfferValidationMessage.houseType.invalidFormat})
  public housingType?: HouseType;

  @IsNumber({}, { message: UpdateOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.countRooms.min })
  @Max(8, { message: UpdateOfferValidationMessage.countRooms.max })
  public roomsCount?: number;

  @IsNumber({}, { message: UpdateOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.countGuests.min })
  @Max(10, { message: UpdateOfferValidationMessage.countGuests.max })
  public guestsCount?: number;

  @IsNumber({}, { message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.min })
  @Max(100000, { message: UpdateOfferValidationMessage.price.max })
  public price?: number;

  @IsArray({ message: UpdateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(Facilities, {message: UpdateOfferValidationMessage.facilities.invalidElementFormat})
  public facilities?: Facilities[];

  @IsObject({ message: UpdateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates?: Coordinates;
}
