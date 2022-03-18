import { Friend } from 'src/core/friend.entity';
import { User } from '../core/user.entity';
import { IFriendRepository } from './borders/friendRepository.interface';

export class FriendsService {
  constructor(private readonly friendsRepository: IFriendRepository ) {}

  addFriend(sender_uuid: User,receiver_uuid: User):Promise<Friend>{
    return this.friendsRepository.sendFriendRequest(sender_uuid,receiver_uuid);
  }

  getFriends(id: string): Promise<User[]>{
    return this.friendsRepository.getFriends(id);
  }

  getSentRequestsPending(id: string): Promise<Friend[]> {
    return this.friendsRepository.getSentRequestsPending(id);
  }

  getReceivedRequestsPending(id: any): Promise<Friend[]> {
    return this.friendsRepository.getReceivedRequestsPending(id);
  }

  removeFriend(creator: User, receiver: User){
    return this.friendsRepository.removeFriend(creator,receiver);
  }
  
}
