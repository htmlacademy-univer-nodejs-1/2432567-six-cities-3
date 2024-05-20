import { UserType } from '../../../const.js';
import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserValidationMessages } from './create-user.messages.js';

export class CreateUserDTO {

  @IsString({ message: CreateUserValidationMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserValidationMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserValidationMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserValidationMessages.password.lengthField })
  public password: string;

  // todo
  public userType: UserType;
}
