import { Module } from '@nestjs/common';
import { RedisRepository } from './redis.repository';
import { redisClientFactory } from './redis.client.factory';


@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisRepository],

    exports: [],
})
export class RedisModule {}
