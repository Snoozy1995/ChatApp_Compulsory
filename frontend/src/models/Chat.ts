import type { User } from "./User";

export interface Chat {
  text: string;
  room: string;
  user: User;
  timestamp: number;
}
