import { User } from '../../core/user.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { FriendSchema } from './friend.schema'
import { Injectable } from '@nestjs/common';
import { IFriendRepository } from 'src/domain/borders/friendRepository.interface'
import { Friend } from 'src/core/friend.entity';

@Injectable()
export class FriendRepositoryAdapter implements IFriendRepository {
  private readonly friendRequestRepo: Repository<Friend>;

  constructor(private readonly em: EntityManager) {
    this.friendRequestRepo = em.getRepository(FriendSchema);
  }
  sendFriendRequest(creator: User, receiver: User): Promise<Friend> {
    //@todo check if already exists etc..
    let obj:Friend={
      creator, receiver, status:0
    }
    return this.friendRequestRepo.save(obj);
  }

  //Not really sure if this is even necessary.
  getFriendRequests(user: User): Promise<Friend[]> {
    return this.friendRequestRepo.find({});
    return this.friendRequestRepo.createQueryBuilder().relation(Friend,"creator").of(user).loadMany();
    return this.friendRequestRepo.find({
      where:[{
        creator: user,
      },{
        receiver: user
      }],

      relations: ['receiver', 'creator']
    });
  }
}
