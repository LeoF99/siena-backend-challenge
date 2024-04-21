import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'intents' })
class IntentsEntity {
  @PrimaryGeneratedColumn('uuid')
  protected readonly id!: string;

  @Column({
    type: 'text',
  })
  protected readonly intent!: string;

  @Column({
    type: 'text',
  })
  protected readonly response!: string;

  @Column()
  protected readonly channel!: string;
}

export default IntentsEntity;
