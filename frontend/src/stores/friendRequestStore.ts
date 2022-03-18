import { FriendRequestService } from "@/services/friendRequest.service";
import { defineStore } from "pinia";
import type { User } from "@/models/User";
import type { FriendRequest } from "@/models/FriendRequest";

const friendRequestService: FriendRequestService = new FriendRequestService();

export const FriendRequestStore = defineStore({
  id: "friendRequestStore",
  state: () => ({
    pendingSentRequests: [] as FriendRequest[],
    pendingReceivedRequests: [] as FriendRequest[],
    friends: [] as User[],
  }),
  actions: {
    sendFriendRequest(sender: User, receiver: User) {
      friendRequestService.sendFriendRequest(sender,receiver).then(()=>{
        this.update(sender.uuid);
      });
    },
    removeFriend(sender: User, receiver: User) {
      friendRequestService.removeFriend(sender,receiver).then(()=>{
        this.update(sender.uuid);
      });
    },
    getFriends(id: string){
      friendRequestService
        .getFriends(id)
        .then((friends) => (this.friends = friends));
    },
    update(id: string){
      this.getFriends(id);
      friendRequestService.getSentRequestsPending(id).then((requests) => {
        this.pendingSentRequests = requests;
      });
      friendRequestService.getReceivedRequestsPending(id).then((requests) => {
        this.pendingReceivedRequests = requests;
      });
    },
  },
});
