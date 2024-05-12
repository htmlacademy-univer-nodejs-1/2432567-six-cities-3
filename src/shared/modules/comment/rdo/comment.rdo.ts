import { Expose, Type } from 'class-transformer';
import { UserRDO } from '../../user/rdo/user.rdo.js';

export class CommentRDO {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose({ name: 'createdAt'})
  public postDate: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRDO)
  public user: UserRDO;
}
