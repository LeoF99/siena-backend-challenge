import S3Provider from '../../infrastructure/aws/s3Provider/s3Provider';
import QueuePayload from '../../infrastructure/messageBroker/types/queuePayload.type';

class MessagesService {
  constructor(
    private readonly s3Provider: S3Provider,
  ) {}

  async processMessages(payload: QueuePayload): Promise<void> {
    const { fileKey } = payload;

    await this.s3Provider.downloadFile(fileKey);
  }
}

export default MessagesService;
