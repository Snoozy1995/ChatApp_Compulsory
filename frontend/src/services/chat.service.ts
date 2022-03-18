import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import type { User } from "@/models/User";
import socketHelper from "../helpers/socket.helper";

export class ChatService {

  createChat(chat: Chat) {
    socketHelper.socket.emit("createChat", chat);
  }

  listenToRoom(
    room: string,
    chatListener: (chat: Chat) => void,
    typingEvent: (typing: {typing:boolean,room: string,user: User}) => void
  ) {
    socketHelper.socket.on(room, (chat: Chat) => {
      chatListener(chat);
    });
    socketHelper.socket.on("typing",(typing)=>{
      typingEvent(typing);
    });
  }

  disconnectFromRoom(room: string) {
    socketHelper.socket.off(room);
    socketHelper.socket.off("typing");
  }

  setTyping(typing: boolean, room: string, user: User) {
    socketHelper.socket.emit("typing", { typing: typing, room: room, user: user });
  }
}
