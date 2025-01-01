import 'dotenv/config';

import { ClassSerializerInterceptor, ValidationPipe, VersioningType, Logger as NestLogger, HttpStatus, UnprocessableEntityException, INestApplication } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as rateLimit from '@fastify/rate-limit';
import { AppModule } from './app.module';
import { ResolvePromisesInterceptor } from './common/interceptors/serializer.interceptor';
import { HttpExceptionFilter, QueryFailedFilter } from './common/filters';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SettingService } from './shared/services/setting.service';
import { setupSwagger } from './shared/swagger/setup';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SharedModule } from './shared.module';
import { otelSDK } from './tracing';

declare const module: any
async function bootstrap(): Promise<INestApplication> {
  // await otelSDK.start()
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    // { cors: true },
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  const settingService = app.select(SharedModule).get(SettingService);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const CORS_OPTIONS = {
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  };
  app.enableCors(CORS_OPTIONS);
  if (settingService.rateLimit.enabled) {
    app.use(rateLimit, {
      max: settingService.rateLimit.max,
      timeWindow: settingService.rateLimit.windowMs,
    });
  }

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new ResolvePromisesInterceptor()
  );
  if (['development', 'staging'].includes(settingService.nodeEnv)) {
    setupSwagger(app, settingService.swaggerConfig);
    if (module.hot) {
      module.hot.accept()
      module.hot.dispose(() => app.close())
    }
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  const port = settingService.getNumber('PORT') || 3000;
  const host = settingService.get('HOST') || '0.0.0.0';
  await app.listen(port, host);

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
