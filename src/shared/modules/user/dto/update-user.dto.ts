import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public avatarPath?: string;

  @IsOptional()
  @IsBoolean()
  public isPro?: boolean;
}
