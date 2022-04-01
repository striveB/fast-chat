import { PrimaryGeneratedColumn, Column, PrimaryColumn, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  userName: string;

  @Column()
  userPassword: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  describe: string;

  @Column({
    nullable: true,
  })
  createDate: Date;
}
