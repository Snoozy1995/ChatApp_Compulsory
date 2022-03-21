import { defineStore } from "pinia";
import type { Room}  from "@/models/Room";
import {RoomService} from "@/services/room.service";

const roomService = new RoomService();

export const RoomStore = defineStore({
    id: "roomStore",
    state: () => ({
        rooms: [] as Room[],

    }),
    actions: {
        createRoom(name: string, authorId: string) {
            roomService.createRoom(name, authorId);
        },
    },
});
