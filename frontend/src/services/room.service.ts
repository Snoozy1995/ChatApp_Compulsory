import axios from "axios";
import type {Room} from "@/models/Room";

export class RoomService {
    http = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "content-type": "application/json",
        },
    });

    getAllRooms(id: number) {
        return this.http.get("/rooms/userId/"+id);
    }

    findAll():Promise<Room[]>  {
        return this.http.get("/rooms/");
    }

    async createRoom(name: string, authorId: string): Promise<Room> {
        const result = await this.http.post<any>("/rooms", {name, authorId});
        return result.data;
    }

}
