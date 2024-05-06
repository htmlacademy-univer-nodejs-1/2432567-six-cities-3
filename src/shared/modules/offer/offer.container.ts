import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferComponent } from './offer.component.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferServiceInterface } from './offer.service.interface.js';
import { OfferService } from './offer.service.js';
import { OfferController } from './offer.controller.js';


export function createOfferContainer() { // todo: ? возможно ли такое создание контейнеров, то есть отдельный компонент
  const offerContainer = new Container();
  offerContainer.bind<OfferServiceInterface>(OfferComponent.OfferService).to(OfferService).inSingletonScope();
  offerContainer.bind<OfferController>(OfferComponent.OfferController).to(OfferController).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(OfferComponent.OfferModel).toConstantValue(OfferModel); // работа напрямую с UserModel
  return offerContainer;
}
