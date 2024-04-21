import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import Intents from '../../../domain/messages/entities/intents';

@Entity({ name: 'intents' })
class IntentsEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column({
    type: 'text',
  })
  readonly intent!: string;

  @Column({
    type: 'text',
  })
  readonly response!: string;

  @Column()
  readonly channel!: string;

  toDomain(entity: IntentsEntity): Intents {
    return new Intents({
      id: entity.id,
      intent: entity.intent,
      response: entity.response,
      channel: entity.channel,
    });
  }
}

export default IntentsEntity;
