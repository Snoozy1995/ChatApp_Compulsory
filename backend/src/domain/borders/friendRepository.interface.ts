import { Friend } from 'src/core/friend.entity';
import { User } from '../../core/user.entity';

export interface IFriendRepository {
  getReceivedRequestsPending(id: any): Promise<Friend[]>;
  getSentRequestsPending(id: string): Promise<Friend[]>;

  sendFriendRequest(sender: User, receiver: User): Promise<Friend>;
  removeFriend(creator: User, receiver: User);

  getFriends(id: string): Promise<User[]>;

}
