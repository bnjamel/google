import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRoot({
      url: 'redis://10.26.141.251:6379',
      type: 'single',
      options: {
        connectTimeout: 10000,
        showFriendlyErrorStack: true,
        password: 'Taeen123$#'
      }
    }),
  ],
  exports: [RedisModule],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
})
export class RedisCacheModule { }
