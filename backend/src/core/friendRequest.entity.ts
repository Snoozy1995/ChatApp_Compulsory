import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FriendRequest_Status } from './friendRequest.interface';
import { User } from './user.entity';

@Entity('request')
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  creator: User;

  @ManyToOne(
    () => User,
    (userEntity) => userEntity.receivedFriendRequests,
  )
  receiver: User;

  @Column()
  status: FriendRequest_Status;
}