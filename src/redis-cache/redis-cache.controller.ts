import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CreateRedisCacheDto } from './dto/create-redis-cache.dto';
import { UpdateRedisCacheDto } from './dto/update-redis-cache.dto';

@Controller('redis-cache')
export class RedisCacheController {
  constructor(private readonly cacheService: RedisCacheService) { }

  @Post('set')
  async setCache(@Body() body: { key: string; value: string; ttl?: number }) {
    await this.cacheService.set(body.key, body.value, body.ttl);
    return { message: 'Cache set successfully' };
  }

  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.cacheService.get(key);
    return { key, value };
  }

  @Post('delete')
  async deleteCache(@Body() body: { key: string }) {
    await this.cacheService.del(body.key);
    return { message: 'Cache deleted successfully' };
  }
}
