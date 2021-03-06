import { FriendRequestService } from "@/services/friendRequest.service";
import { defineStore } from "pinia";
import type { User } from "@/models/User";
import type { FriendRequest } from "@/models/FriendRequest";
import Push from "push.js";

const friendRequestService: FriendRequestService = new FriendRequestService();
export const FriendRequestStore = defineStore({
  id: "friendRequestStore",
  state: () => ({
    pendingSentRequests: [] as FriendRequest[],
    pendingReceivedRequests: [] as FriendRequest[],
    friends: [] as User[],
  }),
  actions: {
    listenForFriends(user: User){
      friendRequestService.listenForFriends((friend)=>{
        if (friend.status == 1 && friend.creator.uuid == user.uuid) {
          Push.create(
            friend.receiver.name + " has accepted your friend request!"
          );
        } else if (friend.status == 0 && friend.receiver.uuid == user.uuid) {
          Push.create(friend.creator.name + " has sent you a friend request!",{
            body: "How's it hangin'?",});
        }
        if (
          friend.receiver.uuid == user.uuid ||
          friend.creator.uuid == user.uuid
        ) {
          this.update(user.uuid);
        }
      });
    },
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
