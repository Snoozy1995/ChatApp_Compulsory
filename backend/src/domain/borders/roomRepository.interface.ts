import {Room} from "../../core/room.entity";

export interface IRoomRepository {
    searchByRoomName(query: string): Promise<Room[]>;

    findById(query: string): Promise<Room>;

    create(name: string, authorId: number): Promise<Room>;

    getRoom(name: string, authorId: string): Promise<Room>;

    getAllRooms(): Promise<Room[]>;

    removeRoom(roomToRemove: Room): Promise<Room>;
}
