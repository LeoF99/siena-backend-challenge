import { DataSource } from 'typeorm';
import config from './config';
import logger from '../../config/helpers/logger';

class DatabaseProvider {
  private readonly client: DataSource;

  constructor() {
    this.client = new DataSource(config);
  }

  async connect(): Promise<void> {
    await this.client.initialize().then(() => {
      logger.info('Database connected');
    }).catch((error) => {
      logger.error('Database connection failed', {
        message: error.message,
      });
    });
  }
}

export default DatabaseProvider;
