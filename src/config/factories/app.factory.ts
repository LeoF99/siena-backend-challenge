import App from '../../application/app';
import IController from '../../application/controllers/controller.intreface';

class AppFactory {
  static factory(controllers: Array<IController>) {
    return new App({ controllers });
  }
}

export default AppFactory;
