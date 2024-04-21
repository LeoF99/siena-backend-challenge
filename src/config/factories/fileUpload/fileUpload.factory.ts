import FileUploadController from '../../../application/controllers/fileUpload/fileUpload.controller';
import FileUploadService from '../../../domain/fileUpload/fileUpload.service';
import MessagesService from '../../../domain/messages/messages.service';
import S3Provider from '../../../infrastructure/aws/s3Provider/s3Provider';
import MessageBrokerProvider from '../../../infrastructure/messageBroker/messageBrokerProvider';

class FileUploadFactory {
  static factory() {
    const s3Provider = new S3Provider();
    const messageBrokerProvider = new MessageBrokerProvider();
    const messagesService = new MessagesService(s3Provider);

    const fileUploadService = new FileUploadService(
      s3Provider,
      messageBrokerProvider,
      messagesService,
    );

    return new FileUploadController(fileUploadService);
  }
}

export default FileUploadFactory;
