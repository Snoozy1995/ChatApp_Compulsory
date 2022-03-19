import {
    Column, Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
export class Room {
    id: number;
    @Column({unique: true})
    name: string;
    @Column()
    authorId: number;
}
