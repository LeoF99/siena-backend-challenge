import { Repository } from 'typeorm';
import dataSource from '../database/dataSource';
import IntentsEntity from '../database/entities/intents.entity';
import Intents from '../../domain/messages/entities/intents';

class IntentsRepository {
  private readonly repository: Repository<IntentsEntity>;

  constructor() {
    this.repository = dataSource.getRepository(IntentsEntity);
  }

  async getByChannel(channel: string): Promise<Intents[]> {
    const data = await this.repository.find({ where: { channel } });

    return data.map((entity) => entity.toDomain(entity));
  }
}

export default IntentsRepository;
