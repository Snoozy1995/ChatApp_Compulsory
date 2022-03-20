import {Room} from "../../core/room.entity";
import {EntityManager, Like, Repository} from "typeorm";
import {RoomSchema} from "./room.schema";
import {Injectable} from "@nestjs/common";
import {IRoomRepository} from "../../domain/borders/roomRepository.interface";

@Injectable()
export class RoomRepositoryAdapter implements IRoomRepository {
    private readonly roomRepo: Repository<Room>;

    constructor(private readonly em: EntityManager) {
        this.roomRepo = em.getRepository(RoomSchema);
    }

    getAllRooms(): Promise<Room[]> {
        return this.roomRepo.find();
    }
    removeRoom(roomToRemove: Room): Promise<Room> {
        throw new Error("Method not implemented.");
    }

    searchByRoomName(query: string): Promise<Room[]> {
        return this.roomRepo.find({
            where: {
                name: Like(`%${query}%`),
            }, select: ['name', 'uuid']
        });
    }

    findById(query
                   :
                   string
    ):
        Promise<Room> {
        return this.roomRepo.findOne({
            where: {
                uuid: query,
            }, select: ['name', 'uuid'],
        });
    }

    create(name: string, authorId: string): Promise<Room> {
        return this.roomRepo.save({name: name, authorId: authorId});
    }

    getRoom(email: string, password: string): Promise<Room> {
        return this.roomRepo.findOne({
            where: {
                email: email,
                password: password,
            },
        });
    }
}
