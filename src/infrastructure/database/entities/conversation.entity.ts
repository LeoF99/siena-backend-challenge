import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import Conversations from '../../../domain/conversations/entities/conversations';

@Entity({ name: 'conversations' })
class ConversationsEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column({
    type: 'text',
  })
  readonly message!: string;

  @Column({
    type: 'text',
  })
  readonly response!: string;

  @Column({
    name: 'sender_username',
  })
  readonly senderUsername!: string;

  @Column({
    name: 'reciever_username',
  })
  readonly recieverUsername!: string;

  constructor(
    message: string,
    response: string,
    senderUsername: string,
    recieverUsername: string,
  ) {
    this.message = message;
    this.response = response;
    this.senderUsername = senderUsername;
    this.recieverUsername = recieverUsername;
  }

  static fromDomain(conversation: Conversations): ConversationsEntity {
    return new ConversationsEntity(
      conversation.message,
      conversation.response,
      conversation.senderUsername,
      conversation.recieverUsername,
    );
  }

  toDomain(entity: ConversationsEntity): Conversations {
    return new Conversations({
      id: entity.id,
      message: entity.message,
      response: entity.response,
      senderUsername: entity.senderUsername,
      recieverUsername: entity.recieverUsername,
    });
  }
}

export default ConversationsEntity;
