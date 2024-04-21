import { Repository } from 'typeorm';
import dataSource from '../database/dataSource';
import ConversationsEntity from '../database/entities/conversation.entity';
import Conversations from '../../domain/conversations/entities/conversations';

class ConversationsRepository {
  private readonly repository: Repository<ConversationsEntity>;

  constructor() {
    this.repository = dataSource.getRepository(ConversationsEntity);
  }

  async save(conversations: Conversations[]): Promise<ConversationsEntity[]> {
    const data = conversations.map((conversation) => ConversationsEntity.fromDomain(conversation));

    return this.repository.save(data);
  }
}

export default ConversationsRepository;
