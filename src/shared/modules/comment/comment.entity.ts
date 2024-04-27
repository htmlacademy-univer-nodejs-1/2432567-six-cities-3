import { defaultClasses, getModelForClass, modelOptions, prop, type Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity';
import { UserEntity } from '../user/user.entity';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    type: () => String,
  })
  public text: string;

  @prop({
    required: true,
    type: () => Date,
  })
  public postDate: Date;

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
