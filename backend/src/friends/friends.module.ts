import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/core/friend.entity';
import { User } from 'src/core/user.entity';
import { IFriendRepository } from 'src/domain/borders/friendRepository.interface';
import { FriendsService } from 'src/domain/friends.service';
import { FriendSchema } from 'src/infrastructure/typeORM/friend.schema';
import { FriendRepositoryAdapter } from 'src/infrastructure/typeORM/friendRepository.adapter';
import { UserSchema } from 'src/infrastructure/typeORM/user.schema';
import { FriendsController } from './friends.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendSchema,UserSchema])],
  controllers: [FriendsController],
  providers: [
    {
      provide: 'FriendRepository',
      useClass: FriendRepositoryAdapter,
    },
    {
      inject: ['FriendRepository'],
      provide: 'FriendsService',
      useFactory: (userRepo: IFriendRepository) => new FriendsService(userRepo),
    },
  ],
})
export class FriendsModule {}
