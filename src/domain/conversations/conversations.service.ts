import logger from '../../config/helpers/logger';
import ConversationsRepository from '../../infrastructure/repositories/conversations.repository';
import Conversations from './entities/conversations';
import Message from './types/message.type';

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

  async find(
    args: {
      skip: number;
      limit: number;
    },
  ): Promise<Conversations[]> {
    try {
      return this.conversationsRepository.find(
        args.skip,
        args.limit,
      );
    } catch (error: any) {
      logger.error('Failed to find conversations', {
        message: error.message,
      });

      throw error;
    }
  }

  async getMessagesById(id: string): Promise<Message> {
    try {
      const conversations = await this.conversationsRepository.getById(id);

      return {
        sender: [conversations.message],
        reciever: conversations.response.split('\n'),
      };
    } catch (error: any) {
      logger.error('Failed to get conversation', {
        message: error.message,
      });

      throw error;
    }
  }
}

export default ConversationsService;
