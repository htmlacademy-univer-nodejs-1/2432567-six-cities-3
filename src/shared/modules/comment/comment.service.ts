import { inject, injectable } from 'inversify';
import type { DocumentType, types } from '@typegoose/typegoose';
import type { CommentEntity } from './comment.entity.js';
import type { CreateCommentDTO } from './dto/create-comment.dto.js';
import { CommentServiceInterface } from './comment.service.interface';
import { CommentComponent } from './comment.component';
import { RestComponent } from '../../../rest/rest.component';
import { LoggerInterface } from '../../libs/logger/logger.interface';

@injectable()
export class CommentService implements CommentServiceInterface {

  constructor(
    @inject(RestComponent.Logger) private readonly logger: LoggerInterface,
    @inject(CommentComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    this.logger.info('');

    return comment.populate('userId');
  }
}
