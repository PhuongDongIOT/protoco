
import { CacheModule } from '@nestjs/cache-manager';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from './cats.constants';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsInfrastructureModule } from './cats.infrastructure';
import { AuthMiddleware } from './cats.middleware';

@Module({
  imports: [
    CacheModule.register(),
    ClientsModule.register([{ name: MATH_SERVICE, transport: Transport.TCP }]),
    CatsInfrastructureModule
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, CatsInfrastructureModule]
})
export class CatsModule {  public configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(AuthMiddleware)
    .forRoutes({path: 'cats/:username/follow', method: RequestMethod.ALL});
}
}
