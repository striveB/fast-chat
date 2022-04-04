import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  friendId: string;
}
