import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { RestComponent } from './rest/rest.component';
import { createRestApplicationContainer } from './rest/rest.container';
import { createUserContainer } from './shared/modules/user/user.container';
import { createOfferContainer } from './shared/modules/offer/offer.container';
import { createCommentContainer } from './shared/modules/comment/comment.container';


async function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const application = container.get<RestApplication>(RestComponent.RestApplication);
  await application.init();
}

await bootstrap();
