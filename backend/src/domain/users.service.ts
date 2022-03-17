import { IUserRepository } from './borders/userRepository.interface';
import { User } from '../core/user.entity';

export class UsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  create(name: string, email: string, password: string): Promise<User> {
    return this.userRepository.create(name, email, password);
  }

  login(email: string, password: string) {
    return this.userRepository.getUser(email, password);
  }

  searchByUsername(query: string): Promise<User[]> {
    return this.userRepository.searchByUsername(query);
  }

  addFriend(sender_uuid: string,receiver_uuid: string):Promise<User>{
    return this.userRepository.addFriend(sender_uuid,receiver_uuid);
  }
  
}
