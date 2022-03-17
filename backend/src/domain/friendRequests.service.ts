import { IFriendRequestRepository } from './borders/friendRequestRepository.interface';
import { User } from '../core/user.entity';
import { FriendRequest } from 'src/core/friendRequest.interface';

export class FriendRequestsService {
  constructor(private readonly friendRequestRepository: IFriendRequestRepository) {}

  sendFriendRequest(sender: User, receiver: User): Promise<FriendRequest> {
    return this.friendRequestRepository.sendFriendRequest(sender,receiver);
  }

  getFriendRequests(user: User): Promise<{sent: FriendRequest[],received: FriendRequest[]}>{
    return this.friendRequestRepository.getFriendRequests(user);
  }

}
