import { Coordinates, Offer, User } from '../../types.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City, Facilities, HouseType } from '../../const.js';
import { UserEntity } from '../user/user.entity';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {

  @prop({
    required: true,
    minlength: [10, 'Min length for title is 10'],
    maxlength: [100, 'Max length for title is 100'],
    trim: true,
    type: () => String,
  })
  public title: string;

  @prop({
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Max length for description is 1024'],
    trim: true,
    type: () => String,
  })
  public description: string;

  @prop({
    required: true,
    type: () => Date,
  })
  public postDate: Date;

  @prop({
    required: true,
    enum: City,
    type: () => String,
  })
  public city: City;

  @prop({
    required: true,
    type: () => String,
  })
  public preview: string;

  @prop({
    required: true,
    default: [],
    type: () => Array<string>,
  })
  public photos: string[];

  @prop({
    required: true,
    type: () => Boolean,
  })
  public isPremium: boolean;

  @prop({
    required: true,
    type: () => Boolean,
  })
  public isFavorite: boolean;

  @prop({
    required: true,
    min: [1, 'Min value for rating is 1'],
    max: [5, 'Max value for rating is 5'],
    type: () => Number,
  })
  public rating: number;

  @prop({
    required: true,
    enum: HouseType,
    type: () => String,
  })
  public houseType: HouseType;

  @prop({
    required: true,
    min: [1, 'Min value for rooms count is 1'],
    max: [8, 'Max value for rooms count is 8'],
    type: () => Number,
  })
  public countRooms: number;

  @prop({
    required: true,
    min: [1, 'Min value for guests count is 1'],
    max: [10, 'Max value for guests count is 10'],
    type: () => Number,
  })
  public countGuests: number;

  @prop({
    required: true,
    min: [100, 'Min value for price is 100'],
    max: [100000, 'Max value for price is 100000'],
    type: () => Number,
  })
  public price: number;

  @prop({
    required: true,
    type: () => Array<string>
  })
  public facilities: Facilities[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author: User;

  @prop({
    default: 0,
    type: () => Number,
  })
  public countComments: number;

  @prop({
    required: true,
    type: () => Object
  })
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
