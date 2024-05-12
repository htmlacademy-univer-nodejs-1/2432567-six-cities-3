import { IsEmail, IsString } from 'class-validator';
import { LoginUserValidationMessages } from './login-user.messages.js';

export class LoginUserDTO {

  @IsEmail({}, { message: LoginUserValidationMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: LoginUserValidationMessages.password.invalidFormat })
  public password: string;
}
