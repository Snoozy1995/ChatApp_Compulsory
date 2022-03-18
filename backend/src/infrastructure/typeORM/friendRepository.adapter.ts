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


  getReceivedRequestsPending(id: any): Promise<Friend[]> {
    return this.friendRequestRepo.find({
      where:{
        receiver: {uuid:id},
        status:0,
      },
      relations: ['receiver', 'creator']
    });
  }
  getSentRequestsPending(id: string): Promise<Friend[]> {
    return this.friendRequestRepo.find({
      where:{
        creator: {uuid:id},
        status:0,
      },
      relations: ['receiver', 'creator']
    });
  }
  async sendFriendRequest(creator: User, receiver: User): Promise<Friend> {
    //@todo check if already exists etc..
    let obj={
      creator, receiver, status:0
    }
    let res=await this.friendRequestRepo.findOne({
      where:[{
        creator: {uuid:creator.uuid},
        receiver: {uuid:receiver.uuid},
      },{
        receiver: {uuid:creator.uuid},
        creator:{uuid:receiver.uuid}
      }],

      relations: ['receiver', 'creator']
    });
    console.log(res);
    if(res){ 
      if(res.status==-1){
        //already handled..
        return;
      }else{
        res.status=1;
        return this.friendRequestRepo.save(res);
      }
    }else{
      return this.friendRequestRepo.save(obj);
    }
  }

  getFriends(id: string): Promise<User[]> {
    return new Promise((resolve,reject)=>{
      this.friendRequestRepo.find({
        where:[{
          creator: {uuid:id},
          status:1,
        },{
          receiver: {uuid:id},
          status:1,
        }],
  
        relations: ['receiver', 'creator']
      }).then((result)=>{
        let users=[];
        result.forEach((friend: Friend) => {
          if (friend.creator.uuid === id) {
            users.push(friend.receiver);
          } else if (friend.receiver.uuid === id) {
            users.push(friend.creator);
          }
        });
        resolve(users);
      }).catch(err=>reject(err));
    });
  }
}
