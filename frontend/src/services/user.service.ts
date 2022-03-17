import http from "./http.client";
import type { User } from "@/models/User";

export class UserService {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const res = await http.post<User>("/users", {
      name: name,
      email: email,
      password: password,
    });
    return res.data;
  }
  async loginUser(email: string, password: string): Promise<User>{
    const res = await http.post<User>("/users/login",{
      email: email,
      password: password,
    });
    return res.data;
  }

  async searchUsers(query: string): Promise<User[]>{
    const res = await http.post<User[]>("/users/search", {
      query: query,
    });
    return res.data;
  }
}
