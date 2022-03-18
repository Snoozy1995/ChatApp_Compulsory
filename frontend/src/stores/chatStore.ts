import { defineStore } from "pinia";
import type { Chat } from "@/models/Chat";
import { ChatService } from "@/services/chat.service";
import type { User } from "@/models/User";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [] as Chat[],
    room: "",
    typing: false,
    somebodyTyping: false,
    user: {} as User,
  }),
  actions: {
    createChat(chat: Chat) {
      chatService.createChat(chat);
      this.chats.push(chat);
    },
    receiveChat(chat: Chat) {
      this.chats.push(chat);
    },
    setRoom(room: string, user: User) {
      if (this.room) chatService.disconnectFromRoom(this.room);
      this.room = room;
      this.user=user;
      chatService.listenToRoom(room, (chat) => {
        this.chats.push(chat);
        },
        (typingObj) => {
          if(this.room!=typingObj.room) return;
          console.log(this.user);
          console.log(typingObj.user);
          if (this.user.uuid == typingObj.user.uuid) return;
          this.somebodyTyping = typingObj.typing;
      });
    },
    sendMessage(text: string){
      if (!this.room||!this.user) return;
      chatService.createChat({ text: text, room: this.room, user:this.user });
    },
    setTyping(bool: boolean,user: User){
      if(!this.room) return;
      this.typing=bool;
      chatService.setTyping(this.typing,this.room,user);
    },
  },
});
