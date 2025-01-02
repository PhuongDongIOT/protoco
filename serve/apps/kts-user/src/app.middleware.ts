import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet'
// import { join } from 'path';

export function middleware(app: NestExpressApplication): NestExpressApplication {

  const isProduction = process.env.NODE_ENV === 'production';

  
  app.enable('trust proxy');
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
    }),
  )
  
  const CORS_OPTIONS = {
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
    methods: '*',
  };

  app.enableCors(CORS_OPTIONS)


  return app
}