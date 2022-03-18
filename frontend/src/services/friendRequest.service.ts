import http from "./http.client";
import type { User } from "@/models/User";

export class FriendRequestService {

  async sendFriendRequest(sender: User, receiver: User) {
    const res = await http.post("/friends/add", {
      creator: sender,
      receiver:receiver,
    });
    return res.data;
  }

  async getFriends(user: User){
    const res = await http.post("/friends", { user: user });
    return res.data;
  }
}
