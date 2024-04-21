import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Conversations {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({
    type: 'text',
  })
    message!: string;

  @Column({
    type: 'text',
  })
    response!: string;

  @Column({
    name: 'sender_username',
  })
    senderUsername!: string;

  @Column({
    name: 'reciever_username',
  })
    recieverUsername!: string;
}

export default Conversations;
