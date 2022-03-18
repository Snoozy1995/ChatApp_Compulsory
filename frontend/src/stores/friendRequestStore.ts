import { FriendRequestService } from "@/services/friendRequest.service";
import { defineStore } from "pinia";
import type { User } from "@/models/User";

const friendRequestService: FriendRequestService = new FriendRequestService();

export const FriendRequestStore = defineStore({
  id: "friendRequestStore",
  state: () => ({}),
  actions: {
    sendFriendRequest(sender: User,receiver: User) {
      return friendRequestService.sendFriendRequest(sender,receiver);
    },
    getFriends(user: User){
      return friendRequestService.getFriends(user);
    }
  },
});
