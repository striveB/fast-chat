import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class UserMessage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @Column()
  friendId: number;

  @Column()
  msgType: number;

  @Column()
  content: string;

  @Column()
  createDate: Date;
}
