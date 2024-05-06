import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
    }
  },
  apis: ['src/shared/modules/offer/offer.controller.ts'],
};

export default swaggerJsdoc(options);

