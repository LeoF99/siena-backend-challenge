import { Express } from 'express';
import S3Provider from '../../infrastructure/aws/s3Provider/s3Provider';
import stringToCsv from '../../helpers/parseCsv/stringToCsv';
import envVars from '../../config/envVars';
import BusinessException from '../../exceptions/businessException';

class FileUploadService {
  private readonly s3Provider: S3Provider;

  constructor(s3Provider: S3Provider) {
    this.s3Provider = s3Provider;
  }

  async uploadFile(file: Express.Multer.File, filename: string): Promise<void> {
    this.validateCsvFile(file);

    await this.s3Provider.uploadFile(file, filename);
  }

  private validateCsvFile(file: Express.Multer.File) {
    const csvString = file.buffer.toString('utf-8');
    const csvData = stringToCsv(csvString);

    if (csvData.length < envVars.application.CSV_MINIMUM_SIZE) {
      throw new BusinessException(
        `Please provide a CSV file with at least ${envVars.application.CSV_MINIMUM_SIZE} rows.`,
      );
    }
  }
}

export default FileUploadService;
