// Fake Message Broker Provider to save some time on the assessment
// Could've been done with AWS SQS or RabbitMQ
// But for the sake of simplicity I'm using a fake one

import logger from '../../config/helpers/logger';
import QueuePayload from './types/queuePayload.type';

class MessageBrokerProvider {
  constructor() {
    this.setupBroker();
  }

  async publishToQueue(
    queueName: string,
    data: QueuePayload,
    callback: (data: QueuePayload) => void,
  ): Promise<void> {
    logger.info(`Message sent to queue ${queueName}`);

    return this.consumeFromQueue(queueName, data, callback);
  }

  async consumeFromQueue(
    queueName: string,
    data: QueuePayload,
    callback: (data: QueuePayload) => void,
  ): Promise<void> {
    logger.info(`Message consumed from queue ${queueName}`);

    callback(data);
  }

  private setupBroker() {
    logger.info('Message broker configured successfully');
  }
}

export default MessageBrokerProvider;
