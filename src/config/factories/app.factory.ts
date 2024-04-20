import App from '../../application/app';
import IController from '../../application/controllers/controller.intreface';
import DatabaseProvider from '../../infrastructure/database/databaseProvider';

class AppFactory {
  static factory(controllers: Array<IController>) {
    const databaseProvider = new DatabaseProvider();

    return new App({ controllers, databaseProvider });
  }
}

export default AppFactory;
