import { Container } from 'inversify';
import type { types } from '@typegoose/typegoose';
import { CommentModel, type CommentEntity } from './comment.entity.js';
import { CommentService } from './comment.service';
import { CommentComponent } from './comment.component';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(CommentComponent.CommentService).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(CommentComponent.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
