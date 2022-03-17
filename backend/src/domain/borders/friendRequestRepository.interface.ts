import { FriendRequest } from 'src/core/friendRequest.interface';
import { User } from '../../core/user.entity';

export interface IFriendRequestRepository {

  sendFriendRequest(sender: User, receiver: User): Promise<FriendRequest>;

  getFriendRequests(user: User): Promise<{sent: FriendRequest[],received: FriendRequest[]}>;

}
