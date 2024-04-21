import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import Messages from './messages.entity';

@Entity()
class Intents {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({
    type: 'text',
  })
    intent!: string;

  @Column({
    type: 'text',
  })
    response!: string;

  @ManyToOne(() => Messages, (message) => message.intents)
    message!: Messages;
}

export default Intents;
