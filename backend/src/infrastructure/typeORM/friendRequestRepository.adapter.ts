import { User } from '../../core/user.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { FriendRequestSchema } from './friend-request.schema';
import { Injectable } from '@nestjs/common';
import { IFriendRequestRepository } from 'src/domain/borders/friendRequestRepository.interface';
import { FriendRequest } from 'src/core/friendRequest.interface';
import { FriendRequestEntity } from 'src/core/friendRequest.entity';

@Injectable()
export class FriendRequestRepositoryAdapter implements IFriendRequestRepository {
  private readonly friendRequestRepo: Repository<FriendRequestEntity>;

  constructor(private readonly em: EntityManager) {
    this.friendRequestRepo = em.getRepository(FriendRequestSchema);
  }
  sendFriendRequest(sender: User, receiver: User): Promise<FriendRequest> {
    //@todo check if already exists etc..
    return this.friendRequestRepo.save({ creator: sender, receiver: receiver });
  }

  //acceptFriendRequest(receiver: User, sender: User): Promise<FriendRequest> {

  //}

  //Not really sure if this is even necessary.
  getFriendRequests(user: User): Promise<{sent: FriendRequest[],received: FriendRequest[]}> {
    return new Promise((resolve,reject)=>{
      this.friendRequestRepo.find({
        where: {
          receiver: user
        },
      }).then((received)=>{
        this.friendRequestRepo.find({
          where: {
            creator: user
          }
        }).then((sent)=>{
          resolve({sent:sent,received:received});
        }).catch(reject);
      }).catch(reject);
    });
  }
}
