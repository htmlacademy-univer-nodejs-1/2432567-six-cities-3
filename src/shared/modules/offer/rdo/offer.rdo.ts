import { Expose } from 'class-transformer';

type CoordinatesRDO = {
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
  public preview: string;

  @Expose()
  public photos: string[];

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
  public facilities: string[];

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: CoordinatesRDO;
}
