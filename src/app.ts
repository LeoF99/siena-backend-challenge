import express, { Express } from 'express';
import helmet from 'helmet';
import logger from './config/helpers/logger';
import RequestLoggerHandler from './config/middlewares/requestLogger';
import notFound from './config/middlewares/notFound';
import errorHandler from './config/middlewares/errorHandler';

const {
  APP_PORT,
} = process.env;

class App {
  private readonly app: Express;

  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = Number(APP_PORT) || 5000;

    this.setupHealthCheck();
    this.setupMiddlewares();
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
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}🚀`);
    });
  }
}

export default App;
