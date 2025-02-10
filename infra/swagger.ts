import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { OpenApiSpecification } from './openapi';

const swaggerSpec = swaggerJSDoc({
    definition: OpenApiSpecification, // Use sua especificação OpenAPI aqui
    apis: [], // Como você já tem a especificação completa, não precisa de arquivos de rotas aqui. Deixe vazio ou remova essa propriedade
  });

export const swaggerDocs = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};