import http from "./http.client";
import type { User } from "@/models/User";
import socketHelper from "@/helpers/socket.helper";
import type { FriendRequest } from "@/models/FriendRequest";

export class FriendRequestService {
  async getReceivedRequestsPending(id: string) {
    const res = await http.get("/friends/pending/" + id);
    return res.data;
  }
  async getSentRequestsPending(id: string) {
    const res = await http.get("/friends/sent/pending/" + id);
    return res.data;
  }

  async sendFriendRequest(sender: User, receiver: User) {
    const res = await http.post("/friends/add", {
      creator: sender,
      receiver: receiver,
    });
    socketHelper.socket.emit("friendRequest", res.data);
    return res.data;
  }

  async getFriends(id: string) {
    const res = await http.get("/friends/" + id);
    return res.data;
  }

  async removeFriend(sender: User, receiver: User) {
    const res = await http.post("/friends/remove", {
      creator: sender,
      receiver: receiver,
    });
    socketHelper.socket.emit("friendRequest", res.data);
    return res.data;
  }

  async listenForFriends(friendListener: (friend: FriendRequest) => void) {
    socketHelper.socket.on("friendRequest", (friend: FriendRequest) => {
      friendListener(friend);
    });
  }
}
