import AppFactory from './config/factories/app.factory';
import ConversationsControllerFactory from './config/factories/conversations/conversationsController.factory';
import FileUploadFactory from './config/factories/fileUpload/fileUpload.factory';

const controllers = [
  FileUploadFactory.factory(),
  ConversationsControllerFactory.factory(),
];

const app = AppFactory.factory(controllers);

app.listen();
