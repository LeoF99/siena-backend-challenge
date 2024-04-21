import FileUploadController from '../../../application/controllers/fileUpload/fileUpload.controller';
import ConversationsService from '../../../domain/conversations/conversations.service';
import FileUploadService from '../../../domain/fileUpload/fileUpload.service';
import MessagesService from '../../../domain/messages/messages.service';
import S3Provider from '../../../infrastructure/aws/s3Provider/s3Provider';
import MessageBrokerProvider from '../../../infrastructure/messageBroker/messageBrokerProvider';
import ConversationsRepository from '../../../infrastructure/repositories/conversations.repository';
import IntentsRepository from '../../../infrastructure/repositories/intents.repository';

class FileUploadFactory {
  static factory() {
    const s3Provider = new S3Provider();
    const messageBrokerProvider = new MessageBrokerProvider();
    const intentsRepository = new IntentsRepository();
    const conversationsRepository = new ConversationsRepository();
    const conversationsService = new ConversationsService(conversationsRepository);

    const messagesService = new MessagesService(
      s3Provider,
      intentsRepository,
      conversationsService,
    );

    const fileUploadService = new FileUploadService(
      s3Provider,
      messageBrokerProvider,
      messagesService,
    );

    return new FileUploadController(fileUploadService);
  }
}

export default FileUploadFactory;
