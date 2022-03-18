import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { User } from '../core/user.entity';
import { FriendsService } from 'src/domain/friends.service';
import { Friend } from 'src/core/friend.entity';

@Controller('friends')
export class FriendsController {
  constructor(@Inject('FriendsService') private readonly friendsService: FriendsService) {}

  @Post("/add")
  addFriend(@Body() friendRequest: Friend):Promise<Friend>{
    return this.friendsService.addFriend(friendRequest.creator,friendRequest.receiver);
  }

  @Get(":id")
  getFriends(@Param('id') id):Promise<User[]>{
    return this.friendsService.getFriends(id);
  }

  @Get("/sent/pending/:id")
  getSentRequestsPending(@Param('id') id):Promise<Friend[]>{
    return this.friendsService.getSentRequestsPending(id);
  }

  @Get("/pending/:id")
  getReceivedRequestsPending(@Param('id') id):Promise<Friend[]>{
    return this.friendsService.getReceivedRequestsPending(id);
  }
}
