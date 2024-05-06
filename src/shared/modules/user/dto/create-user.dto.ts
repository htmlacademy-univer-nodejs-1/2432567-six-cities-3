import { UserType } from '../../../const.js';

export class CreateUserDTO {
  public name: string;
  public email: string;
  public avatarUrl: string;
  public password: string;
  public userType: UserType;
}
