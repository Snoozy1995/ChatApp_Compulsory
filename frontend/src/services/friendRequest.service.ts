import http from "./http.client";
import type { User } from "@/models/User";

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
      receiver:receiver,
    });
    return res.data;
  }

  async getFriends(id: string){
    const res = await http.get("/friends/" + id);
    return res.data;
  }
}
