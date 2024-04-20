import { Express } from 'express';
import S3Provider from '../../../infrastructure/aws/s3Provider/s3Provider';
import FileUploadService from '../fileUpload.service';
import envVars from '../../../config/envVars';

describe('FileUploadService', () => {
  let fileUploadService: FileUploadService;
  let s3Provider: S3Provider;
  let multerFile: Express.Multer.File;

  beforeEach(() => {
    envVars.application.CSV_MINIMUM_SIZE = 1;
    s3Provider = new S3Provider();
    fileUploadService = new FileUploadService(s3Provider);
    multerFile = {
      buffer: Buffer.from(
        'sender_username,reciever_username,message,channel\ntest,test,test,instagram',
      ),
      originalname: 'test.csv',
    } as unknown as Express.Multer.File;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should upload the file to S3', async () => {
    const uploadFileSpy = jest.spyOn(s3Provider, 'uploadFile');
    await fileUploadService.uploadFile(multerFile, 'test.csv');
    expect(uploadFileSpy).toHaveBeenCalledWith(multerFile, 'test.csv');
  });

  it('should validate the CSV file before uploading', async () => {
    const validateCsvFileSpy = jest.spyOn(fileUploadService, 'validateCsvFile');
    await fileUploadService.uploadFile(multerFile, 'test.csv');
    expect(validateCsvFileSpy).toHaveBeenCalledWith(multerFile);
  });
});
