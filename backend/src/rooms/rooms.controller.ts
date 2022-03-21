import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Inject,
} from '@nestjs/common';
import { RoomsService } from '../domain/rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {UsersService} from "../domain/users.service";

@Controller('rooms')
export class RoomsController {

  constructor(
      @Inject('RoomsService') private readonly roomsService: RoomsService,
  ) {}
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto.name, createRoomDto.authorId );
  }

  /**
   * returns a list of all rooms belonging to that user or their friends
   * @param id
   */
  // @Get('userId/:id')
  // getAll(@Param('id') id: number) {
  //   return this.roomsService.getAll(+id);
  // }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.removeRoom(id);
  }
}
