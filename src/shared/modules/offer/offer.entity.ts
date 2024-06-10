import { City, Goods, HouseType, Location } from '../../types.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { CITIES, TYPES } from '../../const.js';
import { UserEntity } from '../user/user.entity.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
    customName: 'notification',
  },
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

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
    enum: CITIES,
    type: () => String,
  })
  public city: City;

  @prop({
    required: true,
    type: () => String,
  })
  public previewImage: string;

  @prop({
    required: true,
    default: [],
    type: () => Array<string>,
  })
  public images: string[];

  @prop({
    required: true,
    type: () => Boolean,
  })
  public isPremium: boolean;

  @prop({
    required: true,
    default: false,
    type: () => Boolean,
  })
  public isFavorite: boolean;

  @prop({
    required: true,
    min: [1, 'Min value for rating is 1'],
    max: [5, 'Max value for rating is 5'],
    default: 1,
    type: () => Number,
  })
  public rating: number;

  @prop({
    required: true,
    enum: TYPES,
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
  public goods: Goods[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId: Ref<UserEntity>;

  @prop({
    default: 0,
    type: () => Number,
  })
  public countComments: number;

  @prop({
    required: true,
    type: () => Object
  })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
