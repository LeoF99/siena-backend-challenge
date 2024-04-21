import { Repository } from 'typeorm';
import dataSource from '../database/dataSource';
import ConversationsEntity from '../database/entities/conversation.entity';
import Conversations from '../../domain/conversations/entities/conversations';

class ConversationsRepository {
  private readonly repository: Repository<ConversationsEntity>;

  constructor() {
    this.repository = dataSource.getRepository(ConversationsEntity);
  }

  async save(conversations: Conversations[]): Promise<Conversations[]> {
    const data = conversations.map((conversation) => ConversationsEntity.fromDomain(conversation));

    const savedItems = await this.repository.save(data);

    return savedItems.map((entity) => entity.toDomain(entity));
  }

  async find(
    skip: number,
    limit: number,
  ): Promise<Conversations[]> {
    const data = await this.repository.find({
      skip,
      take: limit,
    });

    return data.map((entity) => entity.toDomain(entity));
  }

  async getById(id: string): Promise<Conversations> {
    const data = await this.repository.findOneOrFail({ where: { id } });

    return data.toDomain(data);
  }
}

export default ConversationsRepository;
