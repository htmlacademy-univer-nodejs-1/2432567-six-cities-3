import { Expose } from 'class-transformer';

export class UserRDO {

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public userType: string;
}
