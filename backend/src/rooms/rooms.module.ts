import { Module } from '@nestjs/common';
import { RoomsService } from '../domain/rooms.service';
import { RoomsController } from './rooms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomSchema} from "../infrastructure/typeORM/room.schema";
import {RoomRepositoryAdapter} from "../infrastructure/typeORM/roomRepository.adapter";
import {IRoomRepository} from "../domain/borders/roomRepository.interface";

@Module({
  imports: [TypeOrmModule.forFeature([RoomSchema])],
  controllers: [RoomsController],
  providers: [
    {
      provide: 'RoomRepository',
      useClass: RoomRepositoryAdapter,
    },
    {
      inject: ['RoomRepository'],
      provide: 'RoomsService',
      useFactory: (roomRepo: IRoomRepository) => new RoomsService(roomRepo),
    },
  ],
})
export class RoomsModule {}


