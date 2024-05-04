import { StatusCodes } from 'http-status-codes';
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
import { HttpError } from '../../../rest/errors/http-error.js';
import { CreateOfferDto } from './dto/create-offer-dto.js';

@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(RestComponent.Logger) protected readonly logger: PinoLogger,
    @inject(OfferComponent.OfferService) private readonly offerService: OfferService,
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
     *         description: Список предложений
     */
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    /**
     * @swagger
     * /offers:
     *  post:
     *     tags:
     *     - Offer
     *     description: Создание предложения
     *     responses:
     *       200:
     *         description: Список предложений
     */
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });

    /**
     * @swagger
     * /offers/{id}:
     *  get:
     *     tags: [Offer]
     *     description: Получение предложения по идентификатору
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The book id
     *     responses:
     *       200:
     *         description: Список предложений
     */
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.getOffer });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.deleteOffer });
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.patchOffer });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavoriteOffers });
    this.addRoute({ path: '/favorites/:id', method: HttpMethod.Post, handler: this.addFavoriteOffer });
    this.addRoute({ path: '/favorites/:id', method: HttpMethod.Delete, handler: this.removeFavoriteOffer });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAll();
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<RequestParams, RequestBody, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRDO, result));
  }

  public async getOffer(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController',
      );
    }

    const responseData = fillDTO(OfferRDO, offer);
    this.ok(res, responseData);
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController',
      );
    }

    await this.offerService.deleteById(id);
    const responseData = fillDTO(OfferRDO, offer);
    this.ok(res, responseData);
  }

  public async patchOffer(
  // { body, params }: Request<RequestParams, unknown, UpdateOfferDTO>
  // res: Response
  ): Promise<void> {

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );

    // const id = params['id'];
    // const offer = await this.offerService.findById(id);

    // if (!offer) {
    //   throw new HttpError(
    //     StatusCodes.NOT_FOUND,
    //     `Offer with id ${id} not found.`,
    //     'OfferController',
    //   );
    // }

    // const updatedOffer = await this.offerService.updateById(id, body);
    // const responseData = fillDTO(OfferRDO, updatedOffer);
    // this.ok(res, responseData);
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
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController',
      );
    }

    const result = await this.offerService.addToFavorite(id);
    const responseData = fillDTO(OfferRDO, result);
    this.ok(res, responseData);
  }

  public async removeFavoriteOffer(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController',
      );
    }

    const result = await this.offerService.removeFromFavorite(id);
    const responseData = fillDTO(OfferRDO, result);
    this.ok(res, responseData);
  }
}
