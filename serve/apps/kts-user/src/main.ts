import 'dotenv/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType, Logger as NestLogger, /*HttpStatus, UnprocessableEntityException,*/ INestApplication } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
// import { otelSDK } from './tracing.adapter'
import { AppModule } from './app.module';
// import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './common/interceptors/serializer.interceptor';
import { middleware } from './app.middleware';
import { setupSwagger } from './setup-swagger';
// import { HttpExceptionFilter, QueryFailedFilter } from './common/filters';

declare const module: any

async function bootstrap(): Promise<INestApplication> {

  // await otelSDK.start()
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    "api",
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const reflector = app.get(Reflector);

  // app.useGlobalFilters(
  //   new HttpExceptionFilter(reflector),
  //   new QueryFailedFilter(reflector),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //     transform: true,
  //     dismissDefaultMessages: true,
  //     exceptionFactory: (errors) => new UnprocessableEntityException(errors),
  //   }),
  // );

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
  }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new ResolvePromisesInterceptor()
  );

  setupSwagger(app)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  middleware(app)
  await app.listen(3000);

  return app;
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap()
    NestLogger.log(url, 'Bootstrap')
  } catch (error) {
    NestLogger.error(error, 'Bootstrap')
  }
})()
