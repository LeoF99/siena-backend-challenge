import { Repository } from 'typeorm';
import dataSource from '../database/dataSource';
import Intents from '../database/entities/intents.entity';

class IntentsRepository {
  private readonly repository: Repository<Intents>;

  constructor() {
    this.repository = dataSource.getRepository(Intents);
  }

  async getByChannel(channel: string): Promise<Intents[]> {
    return this.repository.find({ where: { channel } });
  }
}

export default IntentsRepository;
