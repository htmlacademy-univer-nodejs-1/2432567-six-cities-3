import { inject, injectable } from 'inversify';
import type { DocumentType, types } from '@typegoose/typegoose';
import type { CommentEntity } from './comment.entity.js';
import type { CreateCommentDTO } from './dto/create-comment.dto.js';
import { CommentServiceInterface } from './comment.service.interface.js';
import { CommentComponent } from './comment.component.js';
import { DEFAULT_COMMENT_COUNT } from '../../const.js';

@injectable()
export class CommentService implements CommentServiceInterface {

  constructor(
    @inject(CommentComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(createCommentDTO: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const savedComment = await this.commentModel.create(createCommentDTO);
    return savedComment.populate('userId');
  }

  public async findByOfferId(offerId: string, count?: number, offset?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;
    const skip = offset ?? 0;
    return this.commentModel
      .find({offerId}, {limit, skip})
      .populate('userId');
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.commentModel
      .exists({_id: documentId})) !== null;
  }
}
