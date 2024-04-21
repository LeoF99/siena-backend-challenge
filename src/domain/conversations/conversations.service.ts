import logger from '../../config/helpers/logger';
import ConversationsRepository from '../../infrastructure/repositories/conversations.repository';
import Conversations from './entities/conversations';

class ConversationsService {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async save(conversations: Conversations[]): Promise<Conversations[]> {
    try {
      const savedConversations = await this.conversationsRepository.save(conversations);

      logger.info('Conversations saved successfully');

      return savedConversations;
    } catch (error: any) {
      logger.error('Failed to save conversations', {
        message: error.message,
      });

      throw error;
    }
  }
}

export default ConversationsService;
