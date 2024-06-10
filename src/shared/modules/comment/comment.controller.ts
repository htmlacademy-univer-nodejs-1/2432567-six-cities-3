import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../../rest/controllers/controller.abstract.js';
import { PinoLogger } from '../../libs/logger/pino.logger.js';
import { CommentComponent } from './comment.component.js';
import { CommentService } from './comment.service.js';
import { RestComponent } from '../../../rest/rest.component.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { HttpError } from '../../../rest/errors/exceptions/http-error.js';
import { fillDTO } from '../../utils/fill-dto.js';
import { RequestParams } from '../../../rest/types/request-params.type.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { RequestBody } from '../../../rest/types/request-body.type.js';
import { OfferComponent } from '../offer/offer.component.js';
import { OfferService } from '../offer/offer.service.js';
import { CommentRDO } from './rdo/comment.rdo.js';
import { PrivateRouteMiddleware } from '../../../rest/middleware/private-route.middleware.js';
import { ValidateDTOMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(RestComponent.Logger) protected readonly pinoLogger: PinoLogger,
    @inject(CommentComponent.CommentService) private readonly commentService: CommentService,
    @inject(OfferComponent.OfferService) private readonly offerService: OfferService,
  ) {
    super(pinoLogger);

    this.pinoLogger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDTOMiddleware(CreateCommentDTO),
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async create(
    { body, tokenPayload }: Request<RequestParams, RequestBody, CreateCommentDTO>,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.findById(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRDO, comment));
  }
}
