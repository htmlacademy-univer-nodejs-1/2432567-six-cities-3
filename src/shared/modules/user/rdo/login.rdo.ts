import { Expose } from 'class-transformer';

export class LoginRDO {
  @Expose()
  public token: string;

  @Expose()
  public email: string;
}