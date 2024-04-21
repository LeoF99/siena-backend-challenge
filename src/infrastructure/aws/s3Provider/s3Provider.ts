import {
  S3Client, ListBucketsCommand, CreateBucketCommand, PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Express } from 'express';
import { Readable } from 'stream';
import envVars from '../../../config/envVars';
import logger from '../../../config/helpers/logger';

class S3Provider {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: envVars.aws.AWS_REGION,
      endpoint: envVars.aws.AWS_S3_HOST,
      forcePathStyle: true,
    });

    this.setupBucket();
  }

  async downloadFile(filename: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: envVars.aws.AWS_S3_BUCKET,
      Key: filename,
    });

    try {
      const response = await this.client.send(command);

      logger.info(`File ${filename} downloaded successfully.`);

      return response.Body as Readable;
    } catch (error: any) {
      logger.error('Failed to download file:', {
        message: error.message,
      });

      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File, filename: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: envVars.aws.AWS_S3_BUCKET,
      Key: filename,
      Body: file.buffer,
    });

    try {
      await this.client.send(command);

      logger.info(`File ${filename} uploaded successfully.`);
    } catch (error: any) {
      logger.error('Failed to upload file:', {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  private async setupBucket(): Promise<void> {
    const isBucketCreated = await this.isBucketCreated();

    if (isBucketCreated) {
      logger.info('Default bucket already created');
      return;
    }

    const createCommand = new CreateBucketCommand({
      Bucket: envVars.aws.AWS_S3_BUCKET,
    });

    try {
      await this.client.send(createCommand);

      logger.info('Default bucket created');
    } catch (error: any) {
      logger.error('Failed to create default bucket', {
        message: error.message,
        stack: error.stack,
      });
    }
  }

  private async isBucketCreated(): Promise<Boolean> {
    const existingBuckets = await this.listBuckets();

    return existingBuckets.includes(envVars.aws.AWS_S3_BUCKET);
  }

  private async listBuckets(): Promise<string[]> {
    const command = new ListBucketsCommand({});
    const response = await this.client.send(command);
    return response.Buckets?.map((buckets) => (buckets.Name || '')) || [];
  }
}

export default S3Provider;
