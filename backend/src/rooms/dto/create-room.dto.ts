import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    authorId: string;
}
