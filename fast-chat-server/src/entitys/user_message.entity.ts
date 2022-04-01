import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class UserMessage {
  @PrimaryGeneratedColumn()
  id: number;

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
