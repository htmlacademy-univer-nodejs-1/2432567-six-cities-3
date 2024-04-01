import { User } from '../../types.js';
import { UserType } from '../../const.js';
import { defaultClasses, prop } from '@typegoose/typegoose';

export interface UserEntity extends defaultClasses.Base {}

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'] })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarUrl: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true, enum: UserType })
  public type: UserType;
}
