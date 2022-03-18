import { Friend } from 'src/core/friend.entity';
import { User } from '../core/user.entity';
import { IFriendRepository } from './borders/friendRepository.interface';

export class FriendsService {
  constructor(private readonly friendsRepository: IFriendRepository ) {}

  addFriend(sender_uuid: User,receiver_uuid: User):Promise<Friend>{
    return this.friendsRepository.sendFriendRequest(sender_uuid,receiver_uuid);
  }

  getFriendRequests(user: User): Promise<Friend[]>{
    return this.friendsRepository.getFriendRequests(user);
  }
  
}
