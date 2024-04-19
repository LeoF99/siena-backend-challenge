import FileUploadController from '../../../application/controllers/fileUpload/fileUpload.controller';
import FileUploadService from '../../../domain/fileUpload/fileUpload.service';
import S3Provider from '../../../infrastructure/aws/s3Provider/s3Provider';

class FileUploadFactory {
  static factory() {
    const s3Provider = new S3Provider();
    const fileUploadService = new FileUploadService(s3Provider);

    return new FileUploadController(fileUploadService);
  }
}

export default FileUploadFactory;
