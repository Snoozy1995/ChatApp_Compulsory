import { Injectable } from '@nestjs/common';
import { UpdateRoomDto } from '../rooms/dto/update-room.dto';
import {IRoomRepository} from "./borders/roomRepository.interface";

@Injectable()
export class RoomsService {


  // constructor(
  //     @InjectRepository(Room) private roomRepository: Repository<Room>,
  //
  //     @InjectRepository(Friend)
  //     private requestRepository: Repository<Friend>,
  //     @InjectRepository(User)
  //     private userRepository: Repository<User>,
  // ) {}


  constructor(private readonly roomRepository: IRoomRepository ) {
  }

  async create(name: string, authorId: string) {
    return await this.roomRepository
        .create(name, authorId)
        .catch((error) => console.log(error.code + ' ' + error.message));
  }

  async findAll() {
    return await this.roomRepository.getAllRooms();
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async removeRoom(id: string) {
    const roomToRemove = await this.roomRepository.findById(id);
    await this.roomRepository.removeRoom(roomToRemove);
    return roomToRemove;
  }

  // async getAll(userId: number) {
  //   //get all friends of that user
  //   const friends = await this.requestRepository.find({
  //     select: [ "creator", 'receiver'],
  //     where: [
  //       { status: 0, creator.uuid: userId },
  //       { status: 0, receiverId: userId },
  //     ],
  //   });
  //
  //   //create an array with ids of users (friends + this user)
  //   const usersIds = [];
  //   friends.forEach((request) => {
  //     if (request.senderId != userId) usersIds.push(request.senderId);
  //     else if (request.receiverId != userId) usersIds.push(request.receiverId);
  //   });
  //   usersIds.push(userId);
  //
  //   //find rooms for those users
  //   const rooms = await this.roomRepository.find({
  //     where: [{ authorId: In(usersIds) }],
  //   });
  //
  //   //get usernames
  //   const roomsToReturn: GetRoomsDto[] = [];
  //   for (const room of rooms) {
  //     await this.userRepository
  //         .findOne({
  //           select: ['username'],
  //           where: [{ id: room.authorId }],
  //         })
  //         .then((user) =>
  //             roomsToReturn.push({
  //               id: room.id,
  //               name: room.name,
  //               author: room.authorId == userId ? 'you' : user.username,
  //             }),
  //         );
  //   }
  //
  //   return roomsToReturn;
  // }
}
