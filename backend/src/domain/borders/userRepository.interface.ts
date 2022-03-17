import { User } from '../../core/user.entity';

export interface IUserRepository {
  addFriend(sender_uuid: string,receiver_uuid: string):Promise<User>;
  searchByUsername(query: string): Promise<User[]>;
  create(name: string, email: string, password: string): Promise<User>;

  getUser(email: string, password: string): Promise<User>;

}
