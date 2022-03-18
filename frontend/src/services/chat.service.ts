import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import type { User } from "@/models/User";

export class ChatService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  createChat(chat: Chat) {
    this.socket.emit("createChat", chat);
  }

  listenToRoom(
    room: string,
    chatListener: (chat: Chat) => void,
    typingEvent: (typing: {typing:boolean,room: string,user: User}) => void
  ) {
    this.socket.on(room, (chat: Chat) => {
      chatListener(chat);
    });
    this.socket.on("typing",(typing)=>{
      typingEvent(typing);
    });
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
    this.socket.off("typing");
  }

  setTyping(typing: boolean, room: string, user: User) {
    this.socket.emit("typing", { typing: typing, room: room, user: user });
  }
}
