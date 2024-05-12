import { Container } from 'inversify';
import type { types } from '@typegoose/typegoose';
import { CommentModel, type CommentEntity } from './comment.entity.js';
import { CommentService } from './comment.service.js';
import { CommentComponent } from './comment.component.js';
import CommentController from './comment.controller.js';
import { ControllerInterface } from '../../../rest/controllers/controller.interface.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(CommentComponent.CommentService).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(CommentComponent.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<ControllerInterface>(CommentComponent.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
