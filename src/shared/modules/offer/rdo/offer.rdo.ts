import { Expose, Type } from 'class-transformer';
import { UserRDO } from '../../user/rdo/user.rdo.js';

type LocationRDO = {
  latitude: number;
  longitude: number;
}

export class OfferRDO {

  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public houseType: string;

  @Expose()
  public countRooms: number;

  @Expose()
  public countGuests: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose({ name: 'userId'})
  @Type(() => UserRDO)
  public user: UserRDO;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: LocationRDO;
}
