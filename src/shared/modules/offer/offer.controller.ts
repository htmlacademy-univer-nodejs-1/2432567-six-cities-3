import { BaseController } from '../../../rest/controllers/controller.abstract.js';
import { OfferComponent } from './offer.component.js';
import { inject, injectable } from 'inversify';
import { PinoLogger } from '../../libs/logger/pino.logger.js';
import { OfferService } from './offer.service.js';
import { RestComponent } from '../../../rest/rest.component.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/fill-dto.js';
import { OfferRDO } from './rdo/offer.rdo.js';
import { RequestParams } from '../../../rest/types/request-params.type.js';
import { RequestBody } from '../../../rest/types/request-body.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { CommentComponent } from '../comment/comment.component.js';
import { CommentService } from '../comment/comment.service.js';
import { CommentRDO } from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../../rest/middleware/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../../rest/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../../rest/middleware/private-route.middleware.js';
import { ValidateDTOMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';
import { ConfigInterface } from '../../libs/config/config.interface.js';
import { ConfigSchema } from '../../libs/config/config.schema.js';
import { UploadFileMiddleware } from '../../../rest/middleware/upload-file.middleware.js';
import { UploadImageRDO } from './rdo/upload-image.rdo.js';

@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(RestComponent.Logger) protected readonly logger: PinoLogger,
    @inject(RestComponent.Config) private readonly config: ConfigInterface<ConfigSchema>,
    @inject(OfferComponent.OfferService) private readonly offerService: OfferService,
    @inject(CommentComponent.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register router for OfferController');

    /**
     * @swagger
     * /offers:
     *  get:
     *     tags: [Offer]
     *     description: Получение всех предложений
     *     responses:
     *       200:
     *         description: Список объектов всех предложений
     */
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    /**
     * @swagger
     * /offers:
     *  post:
     *     tags:
     *     - Offer
     *     description: Создание нового предложения
     *     responses:
     *       200:
     *         description: Объект новое предложения
     */
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDTOMiddleware(CreateOfferDto)]
    });

    /**
     * @swagger
     * /offers/{id}:
     *  get:
     *     tags: [Offer]
     *     description: Получение предложения по идентификатору id
     *     parameters:
     *       - in: path
     *         name: offerId
     *         schema:
     *           types: string
     *         required: true
     *         description: Идентификатор книги
     *     responses:
     *       200:
     *         description: Объект предложения с указанным идентификатором
     */
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    /**
     * @swagger
     * /offers/{id}:
     *  get:
     *     tags: [Offer]
     *     description: Удаление предложения по идентификатору id
     *     parameters:
     *       - in: path
     *         name: offerId
     *         schema:
     *           types: string
     *         required: true
     *         description: Идентификатор книги
     *     responses:
     *       200:
     *         description: Возвращаемое значение отсутствует. Статус-код указывает на успешность удаления
     */
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    /**
     * @swagger
     * /offers/{id}:
     *  get:
     *     tags: [Offer]
     *     description: Изменение предложения по идентификатору id
     *     parameters:
     *       - in: path
     *         name: offerId
     *         schema:
     *           types: string
     *         required: true
     *         description: Идентификатор книги
     *     responses:
     *       200:
     *         description: Измененный объект предложения
     */
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.patchOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavoriteOffers });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.addFavoriteOffer });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.removeFavoriteOffer });
    this.addRoute(
      { path: '/:offerId/comments',
        method: HttpMethod.Get,
        handler: this.getComments,
        middlewares: [
          new ValidateObjectIdMiddleware('offerId'),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        ]});
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAll();
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: Request<RequestParams, RequestBody, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    this.created(res, fillDTO(OfferRDO, result));
  }

  public async getOffer({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    const responseData = fillDTO(OfferRDO, offer);
    this.ok(res, responseData);
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);
    await this.offerService.deleteById(id);
    this.noContent(res, offer);
  }

  public async patchOffer(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDTO>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    const responseData = fillDTO(OfferRDO, updatedOffer);
    this.ok(res, responseData);
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const city = req.params['city'];
    const offers = await this.offerService.findByCityAndPremium(city);
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async getFavoriteOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavoriteOffers();
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async addFavoriteOffer(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const result = await this.offerService.addToFavorite(id);
    const responseData = fillDTO(OfferRDO, result);
    this.ok(res, responseData);
  }

  public async removeFavoriteOffer(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const result = await this.offerService.removeFromFavorite(id);
    const responseData = fillDTO(OfferRDO, result);
    this.ok(res, responseData);
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRDO, comments));
  }

  public async uploadImage({ params, file } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDTO = { preview: file?.filename };
    await this.offerService.updateById(offerId, updateDTO);
    const responseData = fillDTO(UploadImageRDO, updateDTO);
    this.created(res, responseData);
  }
}
