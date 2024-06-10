import { IsMongoId, MaxLength, MinLength } from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

export class CreateCommentDTO {

  @MinLength(20, { message: CreateCommentValidationMessage.comment.minLength })
  @MaxLength(1024, { message: CreateCommentValidationMessage.comment.maxLength })
  public comment: string;

  @IsMongoId({ each: true, message: CreateCommentValidationMessage.offerId.invalidId })
  public offerId: string;

  public userId: string;
}
