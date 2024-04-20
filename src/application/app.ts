import express, { Express } from 'express';
import helmet from 'helmet';
import logger from '../config/helpers/logger';
import RequestLoggerHandler from '../config/middlewares/requestLogger';
import envVars from '../config/envVars';
import IController from './controllers/controller.intreface';
import DatabaseProvider from '../infrastructure/database/databaseProvider';

const {
  APP_PORT,
} = envVars.application;

class App {
  private readonly app: Express;

  private readonly port: number;

  constructor(appInit: {
    controllers: Array<IController>;
    databaseProvider: DatabaseProvider;
  }) {
    this.app = express();
    this.port = Number(APP_PORT) || 5000;

    this.setupHealthCheck();
    this.setupMiddlewares();
    this.setupDatabase(appInit.databaseProvider);
    this.routes(appInit.controllers);
  }

  private setupHealthCheck() {
    this.app.get('/', (req, res) => {
      res.json({ message: 'Server running!🚀' });
    });
  }

  private setupMiddlewares() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(RequestLoggerHandler);
  }

  private routes(controllers: Array<IController>) {
    controllers.forEach((controller) => this.app.use('/', controller.getRoutes()));
  }

  private async setupDatabase(databaseProvider: DatabaseProvider) {
    await databaseProvider.connect();
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}🚀`);
    });
  }
}

export default App;
