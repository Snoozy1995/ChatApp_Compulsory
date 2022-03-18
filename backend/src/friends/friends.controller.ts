import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { User } from '../core/user.entity';
import { FriendsService } from 'src/domain/friends.service';
import { Friend } from 'src/core/friend.entity';

@Controller('friends')
export class FriendsController {
  constructor(@Inject('FriendsService') private readonly friendsService: FriendsService) {}

  @Post("/add")
  addFriend(@Body() friendRequest: Friend):Promise<Friend>{
    //console.log(ids);
    return this.friendsService.addFriend(friendRequest.creator,friendRequest.receiver);
  }

  @Post()
  getFriends(@Body() user: User):Promise<Friend[]>{
    //console.log(ids);
    return this.friendsService.getFriendRequests(user);
  }
}
