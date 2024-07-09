import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { StorageModule } from './storage/storage.module';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    StorageModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
