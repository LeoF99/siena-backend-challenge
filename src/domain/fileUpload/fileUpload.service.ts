import { Express } from 'express';
import S3Provider from '../../infrastructure/aws/s3Provider/s3Provider';

class FileUploadService {
  private readonly s3Provider: S3Provider;

  constructor(s3Provider: S3Provider) {
    this.s3Provider = s3Provider;
  }

  async uploadFile(file: Express.Multer.File, filename: string): Promise<void> {
    await this.s3Provider.uploadFile(file, filename);
  }
}

export default FileUploadService;
