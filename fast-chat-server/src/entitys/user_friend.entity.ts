import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  friendId: number;
}
