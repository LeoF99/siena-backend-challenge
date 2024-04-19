import AppFactory from './config/factories/app.factory';
import FileUploadFactory from './config/factories/fileUpload/fileUpload.factory';

const controllers = [
  FileUploadFactory.factory(),
];

const app = AppFactory.factory(controllers);

app.listen();
