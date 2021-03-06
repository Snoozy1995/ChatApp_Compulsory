import {IUserRepository} from '../../domain/borders/userRepository.interface';
import {User} from '../../core/user.entity';
import {EntityManager, Like, Repository} from 'typeorm';
import {UserSchema} from './user.schema';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserRepositoryAdapter implements IUserRepository {
    private readonly userRepo: Repository<User>;

    constructor(private readonly em: EntityManager) {
        this.userRepo = em.getRepository(UserSchema);
    }

    searchByUsername(query: string): Promise<User[]> {
        return this.userRepo.find({
            where: {
                name: Like(`%${query}%`),
            }, select: ['name', 'uuid']
        });
    }

    searchByID(query: string): Promise<User> {
        return this.userRepo.findOne({
            where: {
                uuid: query,
            }, select: ['name', 'uuid'],
        });
    }

    create(name: string, email: string, password: string): Promise<User> {
        return this.userRepo.save({name: name, email: email, password: password});
    }

    getUser(email: string, password: string): Promise<User> {
        return this.userRepo.findOne({
            where: {
                email: email,
                password: password,
            },
        });
    }
}
