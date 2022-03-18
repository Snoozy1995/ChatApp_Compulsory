import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export class Friend {
  uuid: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => User)
  receiver: User;

  status: number;
}