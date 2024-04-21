import S3Provider from '../../infrastructure/aws/s3Provider/s3Provider';
import QueuePayload from '../../infrastructure/messageBroker/types/queuePayload.type';
import openFile from '../../helpers/parseCsv/openFile';
import IntentsRepository from '../../infrastructure/repositories/intents.repository';
import Conversations from '../conversations/entities/conversations';
import ConversationsService from '../conversations/conversations.service';

class MessagesService {
  constructor(
    private readonly s3Provider: S3Provider,
    private readonly intentsRepository: IntentsRepository,
    private readonly conversationsService: ConversationsService,
  ) {}

  async processMessages(payload: QueuePayload): Promise<void> {
    const { fileKey } = payload;

    const fileStream = await this.s3Provider.downloadFile(fileKey);

    const messages = await openFile(fileStream);

    const conversations: Conversations[] = [];
    for (const message of messages) {
      const intents = await this.intentsRepository.getByChannel(
        message.channel,
      );

      const intentsResponses = intents.map((intent) => intent.response);

      const response = this.mountFinalResponse(intentsResponses, message.sender_username);

      const conversation = new Conversations({
        message: message.message,
        response,
        senderUsername: message.sender_username,
        recieverUsername: message.reciever_username,
      });

      conversations.push(conversation);
    }

    await this.conversationsService.save(conversations);
  }

  private mountFinalResponse(
    responses: string[],
    senderUsername: string,
  ): string {
    const responsePrefix = `Hey ${senderUsername}, `;

    return responsePrefix + responses.join('\n');
  }
}

export default MessagesService;
