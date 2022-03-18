import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export class Friend {
  uuid?: string;

  @ManyToOne(() => User)
  @JoinColumn([
    { name: "uuid", referencedColumnName: "creator_id" },
  ])
  creator: User;

  @ManyToOne(() => User)
  @JoinColumn([
    { name: "uuid", referencedColumnName: "receiver_id" },
  ])
  receiver: User;

  @Column()
  status: number;
}