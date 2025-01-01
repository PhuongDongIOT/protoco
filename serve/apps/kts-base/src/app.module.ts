
import {DevtoolsModule} from "@nestjs/devtools-integration"; 
// import { CacheModule } from '@nestjs/cache-manager';
// import { join } from 'path';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { TerminusModule } from '@nestjs/terminus';
import { JwtModule } from '@nestjs/jwt';
// import { ClsModule } from 'nestjs-cls';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { DatabaseModule } from './core/database/database.module';
import { RedisModule } from './core/redis/redis.module';
import { SharedModule } from './shared.module';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { SettingService } from './shared/services/setting.service';
import { TasksModule } from './shared/tasks/tasks.module';
import { EventsModule } from './shared/events/events.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    // TerminusModule,
    RedisModule,
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (settingService: SettingService) => ({
        secret: settingService.jwtConfig.secretKey,
      }),
      inject: [SettingService],
    }),
    DatabaseModule.forRootAsync({
      imports: [],
      inject: [SettingService],
      useFactory: (settingService: SettingService) => ({
        ...settingService.databaseKey
      }),
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'schema.gql',
      subscription: true,
      graphiql: true,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // ClsModule.forRoot({
    //   global: true,
    //   middleware: {
    //     mount: true,
    //   },
    // }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    EventEmitterModule.forRoot(),
    SharedModule,
    CoreModule,
    CatsModule,
    TasksModule,
    EventsModule,
    RecipesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}