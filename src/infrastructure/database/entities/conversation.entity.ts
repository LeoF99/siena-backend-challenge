import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import Conversations from '../../../domain/conversations/entities/conversations';

@Entity({ name: 'conversations' })
class ConversationsEntity {
  @PrimaryGeneratedColumn('uuid')
  protected readonly id!: string;

  @Column({
    type: 'text',
  })
  protected readonly message!: string;

  @Column({
    type: 'text',
  })
  protected readonly response!: string;

  @Column({
    name: 'sender_username',
  })
  protected readonly senderUsername!: string;

  @Column({
    name: 'reciever_username',
  })
  protected readonly recieverUsername!: string;

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
}

export default ConversationsEntity;
