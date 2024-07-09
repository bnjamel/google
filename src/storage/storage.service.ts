import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    // Provide the path to your service account key JSON file
    this.storage = new Storage({
      keyFilename: 'private/sincere-cat-428514-i8-064d28560964.json',
    });
    this.bucketName = 'nest-cloud-bucket';
  }

  async uploadFile(buffer: Buffer, destination: string): Promise<void> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(destination);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => resolve());
      blobStream.on('error', (err) => reject(err));
      blobStream.end(buffer); // Write the file buffer to the stream
    });
  }

  async downloadFile(srcFilename: string, destFilename: string): Promise<void> {
    const options = {
      destination: destFilename,
    };
    await this.storage.bucket(this.bucketName).file(srcFilename).download(options);
  }

  async deleteFile(filename: string): Promise<void> {
    await this.storage.bucket(this.bucketName).file(filename).delete();
  }
}
