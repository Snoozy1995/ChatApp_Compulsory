import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Friend } from 'src/core/friend.entity';
import { FriendsService } from 'src/domain/friends.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FriendsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly friendsService: FriendsService) {}


  @SubscribeMessage('friendRequest')
  setTyping(@MessageBody() object : Friend){
    console.log("Friend request");
    this.server.emit("friendRequest",object);
  }
}
