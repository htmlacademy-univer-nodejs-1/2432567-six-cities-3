import { City, Facilities, HouseType } from '../../../const.js';
import { Coordinates } from '../../../types.js';

export class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;
  public preview?: string;
  public pictures?: string[];
  public isPremium?: boolean;
  public housingType?: HouseType;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public facilities?: Facilities[];
  public coordinates?: Coordinates;
}
