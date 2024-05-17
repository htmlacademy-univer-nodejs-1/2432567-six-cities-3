import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { RestComponent } from './rest/rest.component.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createCommentContainer } from './shared/modules/comment/comment.container.js';
import { createAuthContainer } from './shared/modules/auth/auth.container.js';


async function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer(),
  );

  const application = container.get<RestApplication>(RestComponent.RestApplication);
  await application.init();
}

await bootstrap();
