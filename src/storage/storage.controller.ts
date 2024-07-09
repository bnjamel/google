import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { Response } from 'express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)

    const destination = `uploads/${file.originalname}`;
    await this.storageService.uploadFile(file.buffer, destination);
    return { message: 'File uploaded successfully', destination };
  }

  @Get('download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const tempFilePath = `/tmp/${filename}`;
    await this.storageService.downloadFile(`uploads/${filename}`, tempFilePath);
    return res.sendFile(tempFilePath);
  }

  @Post('delete/:filename')
  async deleteFile(@Param('filename') filename: string) {
    await this.storageService.deleteFile(`uploads/${filename}`);
    return { message: 'File deleted successfully' };
  }
}
