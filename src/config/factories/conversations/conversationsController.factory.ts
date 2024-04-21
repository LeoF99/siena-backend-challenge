import ConversationsController from '../../../application/controllers/conversations/conversations.controller';
import ConversationsService from '../../../domain/conversations/conversations.service';
import ConversationsRepository from '../../../infrastructure/repositories/conversations.repository';

class ConversationsControllerFactory {
  static factory() {
    const conversationsRepository = new ConversationsRepository();
    const conversationsService = new ConversationsService(conversationsRepository);

    return new ConversationsController(conversationsService);
  }
}

export default ConversationsControllerFactory;
