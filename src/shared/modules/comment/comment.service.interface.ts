import type { DocumentType } from '@typegoose/typegoose';
import type { CreateCommentDTO } from './dto/create-comment.dto';
import type { CommentEntity } from './comment.entity';

export interface CommentServiceInterface {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
}
