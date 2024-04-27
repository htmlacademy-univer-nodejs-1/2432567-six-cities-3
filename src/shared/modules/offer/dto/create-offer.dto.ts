import { City, Facilities, HouseType } from '../../../const.js';
import { Coordinates } from '../../../types.js';
import { UserEntity } from '../../user/user.entity';
import { Ref } from '@typegoose/typegoose';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public houseType: HouseType;
  public countRooms: number;
  public countGuests: number;
  public price: number;
  public facilities: Facilities[];
  public authorId: Ref<UserEntity>;
  public coordinates: Coordinates;
}
