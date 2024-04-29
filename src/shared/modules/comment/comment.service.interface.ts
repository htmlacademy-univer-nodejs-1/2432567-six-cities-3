import type { DocumentType } from '@typegoose/typegoose';
import type { CreateCommentDTO } from './dto/create-comment.dto';
import type { CommentEntity } from './comment.entity';

export interface CommentServiceInterface {
  create(createCommentDTO: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string, count?: number, offset?: number): Promise<DocumentType<CommentEntity>[]>;
}
