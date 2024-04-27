import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferComponent } from './offer.component';
import { OfferEntity, OfferModel } from './offer.entity';
import { OfferServiceInterface } from './offer.service.interface';
import { OfferService } from './offer.service';


export function createOfferContainer() { // todo: ? возможно ли такое создание контейнеров, то есть отдельный компонент
  const userContainer = new Container();
  userContainer.bind<OfferServiceInterface>(OfferComponent.OfferService).to(OfferService).inSingletonScope();
  userContainer.bind<types.ModelType<OfferEntity>>(OfferComponent.OfferModel).toConstantValue(OfferModel); // работа напрямую с UserModel
  return userContainer;
}
