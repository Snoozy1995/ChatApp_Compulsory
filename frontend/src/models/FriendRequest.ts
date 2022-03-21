import type { User } from "./User";

export interface FriendRequest {
  uuid: string;
  receiver: User;
  creator: User;
  status: number;
}
