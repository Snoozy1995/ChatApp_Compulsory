import { JoinTable, ManyToMany } from "typeorm";

export class User {
  uuid: string;
  name: string;
  email: string;
  password: string;
  friends:User[];
  @ManyToMany(type => User, user => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(type => User, user => user.followers)
  following: User[];
}
