import { CITIES, GOODS, TYPES } from '../../../const.js';
import { City, Goods, HouseType, Location } from '../../../types.js';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDTO {

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(CITIES, { message: UpdateOfferValidationMessage.city.invalidFormat })
  public city?: City;

  @MaxLength(256, { message: UpdateOfferValidationMessage.preview.maxLength })
  public previewImage?: string;

  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  public images?: string[];

  @IsOptional()
  @IsEnum(TYPES, {message: UpdateOfferValidationMessage.houseType.invalidFormat})
  public houseType?: HouseType;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.countRooms.min })
  @Max(8, { message: UpdateOfferValidationMessage.countRooms.max })
  public countRooms?: number;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.countGuests.min })
  @Max(10, { message: UpdateOfferValidationMessage.countGuests.max })
  public countGuests?: number;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.min })
  @Max(100000, { message: UpdateOfferValidationMessage.price.max })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(GOODS, {message: UpdateOfferValidationMessage.facilities.invalidElementFormat})
  public goods?: Goods[];

  @IsOptional()
  @IsObject({ message: UpdateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates?: Location;
}
