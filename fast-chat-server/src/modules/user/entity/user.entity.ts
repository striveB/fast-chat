import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ApiProperty({
    description: '用户名',
  })
  @Column()
  userName: string;

  @ApiProperty({
    description: '密码',
  })
  @Column()
  userPassword: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @ApiProperty({
    description: '个人介绍',
  })
  @Column({
    nullable: true,
  })
  describe: string;

  @Column({
    nullable: true,
  })
  createDate: Date;
}
