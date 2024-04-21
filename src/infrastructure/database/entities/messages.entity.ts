import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import Intents from './intents.entity';

@Entity()
class Messages {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({
    name: 'sender_username',
  })
    senderUsername!: string;

  @Column({
    name: 'reciever_username',
  })
    recieverUsername!: string;

  @Column()
    message!: string;

  @OneToMany(() => Intents, (intent) => intent.message)
    intents!: Intents[];
}

export default Messages;
