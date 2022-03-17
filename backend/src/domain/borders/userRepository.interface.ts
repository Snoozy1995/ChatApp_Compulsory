import { User } from '../../core/user.entity';

export interface IUserRepository {
  searchByUsername(query: string): Promise<User[]>;
  create(name: string, email: string, password: string): Promise<User>;

  getUser(email: string, password: string): Promise<User>;

}
