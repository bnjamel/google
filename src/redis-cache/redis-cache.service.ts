import { Injectable } from '@nestjs/common';
import { CreateRedisCacheDto } from './dto/create-redis-cache.dto';
import { UpdateRedisCacheDto } from './dto/update-redis-cache.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) { }

  async set(key: string, value: string, ttl?: number): Promise<any> {
    const cachedValue = await this.redis.get(key)
    if (cachedValue) {
      return cachedValue
    }
    return await new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.redis.set(key, value)
        resolve(value)
      }, 3000);
    })

  }

  async get(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
