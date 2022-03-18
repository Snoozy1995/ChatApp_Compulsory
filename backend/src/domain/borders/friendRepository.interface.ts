import { Friend } from 'src/core/friend.entity';
import { User } from '../../core/user.entity';

export interface IFriendRepository {

  sendFriendRequest(sender: User, receiver: User): Promise<Friend>;

  getFriendRequests(user: User): Promise<Friend[]>;

}
