import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from './chats/chats.module';
import { FriendsModule } from './friends/friends.module';
import { RoomsModule} from "./rooms/rooms.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/giga.db',
      autoLoadEntities: true,
      synchronize: true,

    }),
    UsersModule,
    ChatsModule,
    FriendsModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
