import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
    channel!: string;
}

export default Intents;
