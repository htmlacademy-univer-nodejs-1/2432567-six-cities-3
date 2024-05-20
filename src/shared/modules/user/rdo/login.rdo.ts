import { Expose } from 'class-transformer';

export class LoginRDO {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public name: string;
}
